import { Injectable, Logger } from '@nestjs/common';
import { RunnableSequence } from "@langchain/core/runnables";
import { NewsAnalysisState } from './interfaces/news-analysis-state.interface';
import { NewsFetcherService } from './services/news-fetcher.service';
import { NewsAnalyserService } from './services/news-analyser.service';
import { StockDataService } from './services/stock-data.service';
import { MarketSentimentResponseDto, SentimentType } from './dto/market-sentiment-response.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LangGraphService {
  private readonly logger = new Logger(LangGraphService.name);
  private readonly workflow: RunnableSequence;

  constructor(
    private readonly newsFetcher: NewsFetcherService,
    private readonly newsAnalyser: NewsAnalyserService,
    private readonly stockData: StockDataService,
    private readonly prisma: PrismaService
  ) {
    // Create a sequential workflow that passes state through each step
    this.workflow = RunnableSequence.from([
      // Step 0: Log initial state for debugging
      async (state: NewsAnalysisState) => {
        this.logger.debug('Starting workflow with initial state', { 
          query: state.query || '(empty)',
          isDefaultQuery: state.isDefaultQuery || false,
          tickerCount: state.tickers?.length || 0,
          tickers: state.tickers?.join(', ') || 'none',
          bypassCache: !!state.bypassCache
        });
        return { state };
      },
      // Step 1: Fetch News
      async (state: NewsAnalysisState) => {
        const startTime = Date.now();
        const newsState = await this.newsFetcher.fetchNews(state);
        this.logger.debug('News fetcher completed', { 
          duration: `${Date.now() - startTime}ms`,
          articleCount: newsState.articles?.length || 0,
          hasError: !!newsState.error
        });
        return { state: newsState };
      },
      // Step 2: Analyze News (only if we have articles)
      async ({ state }) => {
        if (state.error || !state.articles?.length) {
          return { state };
        }
        const analysisState = await this.newsAnalyser.analyseNews(state);
        return { state: analysisState };
      },
      // Step 3: Fetch Stock Data (only if we have analysis and no errors)
      async ({ state }) => {
        if (state.error || !state.analysis || !state.tickers?.length) {
          return { state };
        }
        const finalState = await this.stockData.fetchStock(state);
        return { state: finalState };
      },
      // Final step: Validate output state
      async ({ state }) => {
        // Inspect the final state for debugging
        this.logger.debug('Final workflow state', {
          hasAnalysis: !!state.analysis,
          analysisLength: state.analysis?.length || 0,
          tickerCount: state.tickers?.length || 0,
          tickers: state.tickers?.join(', ') || 'none',
          stockInfoCount: state.stockInfoMap ? Object.keys(state.stockInfoMap).length : 0,
          hasError: !!state.error
        });
        return { state };
      }
    ]);
  }

  private mapSentiment(backendSentiment: string | undefined): SentimentType {
    switch (backendSentiment) {
      case 'positive':
        return 'bullish';
      case 'negative':
        return 'bearish';
      default:
        return 'neutral';
    }
  }

  private transformToMarketSentimentResponse(state: NewsAnalysisState): MarketSentimentResponseDto {
    // Create a default analysis if missing
    const defaultAnalysis = {
      analysis: 'No market analysis available',
      sectors: [],
      marketSentiment: 'neutral' as const,
      tickers: [],
    };

    // Create a default stock info if missing
    const defaultStockInfo = {
      ticker: 'N/A',
      price: 0,
      dayChange: 0,
      dayChangePercent: 0,
      marketCap: 0,
      time: new Date().toISOString(),
    };

    const structuredAnalysis = state.structuredAnalysis ? {
      ...state.structuredAnalysis,
      // Use tickers from either structuredAnalysis or the main state, preferring non-empty arrays
      tickers: (state.structuredAnalysis.tickers && state.structuredAnalysis.tickers.length > 0) 
        ? state.structuredAnalysis.tickers 
        : (state.tickers || []),
      marketSentiment: this.mapSentiment(state.structuredAnalysis.marketSentiment)
    } : defaultAnalysis;

    return {
      structuredAnalysis,
      sentiment: this.mapSentiment(state.sentiment),
      stockInfoMap: state.stockInfoMap || {},
      stockInfo: state.stockInfo || defaultStockInfo,
      error: state.error || (!state.structuredAnalysis ? 'No market analysis data available' : undefined),
    };
  }

  async runWorkflow(initialState: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      const result = await this.workflow.invoke(initialState);
      return result.state;
    } catch (err) {
      this.logger.error('Error executing workflow', err);
      // Return a proper error state instead of throwing
      return {
        ...initialState,
        error: `Workflow execution failed: ${err.message}`,
        articles: [],
        analysis: ''
      };
    }
  }

  async getMarketSentiment(includeDebugInfo = false): Promise<MarketSentimentResponseDto> {
    const initialState: NewsAnalysisState = {
      query: '',
      articles: [],
      analysis: '',
      isDefaultQuery: true,
      bypassCache: includeDebugInfo  // Add bypass cache flag if debug is enabled
    };

    try {
      this.logger.log('Starting market sentiment analysis with default query');
      const startTime = Date.now();
      
      const result = await this.workflow.invoke(initialState);
      
      this.logger.log('Market sentiment analysis completed', {
        duration: `${Date.now() - startTime}ms`,
        hasAnalysis: !!result.state.analysis,
        tickerCount: result.state.tickers?.length || 0,
        stockInfoCount: result.state.stockInfoMap ? Object.keys(result.state.stockInfoMap).length : 0
      });
      
      return this.transformToMarketSentimentResponse(result.state);
    } catch (err) {
      this.logger.error('Error getting market sentiment', err);
      throw err;
    }
  }

  // Add the clearCache method to support the new endpoint
  async clearCache(): Promise<{ message: string }> {
    try {
      // Delete recent analysis results (last 2 hours)
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      
      const result = await this.prisma.newsAnalysisResult.deleteMany({
        where: {
          createdAt: {
            gte: twoHoursAgo
          }
        }
      });
      
      this.logger.log(`Cache cleared: deleted ${result.count} analysis records`);
      return { message: `Cache cleared: deleted ${result.count} analysis records` };
    } catch (error) {
      this.logger.error('Error clearing cache', error);
      throw error;
    }
  }
}
