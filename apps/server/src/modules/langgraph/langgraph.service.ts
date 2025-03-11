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
    if (!state.structuredAnalysis) {
      this.logger.warn('No structured analysis available for market sentiment response');
    }

    // Create a default stock info if missing
    const defaultStockInfo = {
      ticker: 'N/A',
      price: 0,
      dayChange: 0,
      dayChangePercent: 0,
      marketCap: 0,
      time: new Date().toISOString(),
    };

    const mapSentiment = (sentiment: string | undefined): SentimentType => {
      switch (sentiment?.toLowerCase()) {
        case 'positive':
          return 'bullish';
        case 'negative':
          return 'bearish';
        default:
          return 'neutral';
      }
    };

    const mappedStructuredAnalysis = state.structuredAnalysis ? {
      ...state.structuredAnalysis,
      marketSentiment: mapSentiment(state.structuredAnalysis.marketSentiment)
    } : {
      analysis: 'No market analysis available',
      sectors: [],
      marketSentiment: 'neutral' as SentimentType,
      tickers: []
    };

    return {
      structuredAnalysis: mappedStructuredAnalysis,
      sentiment: mapSentiment(state.sentiment),
      stockInfoMap: state.stockInfoMap || {},
      stockInfo: state.stockInfo || defaultStockInfo
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

  async getMarketSentiment(): Promise<MarketSentimentResponseDto> {
    try {
      // Initialize state with default query for market overview
      const state: NewsAnalysisState = {
        articles: [],
        analysis: '',
        query: '',
        isDefaultQuery: true,
        bypassCache: false // Allow cache for performance
      };

      // Run the full workflow to get latest market sentiment
      const analysisResult = await this.runWorkflow(state);
      return this.transformToMarketSentimentResponse(analysisResult);
    } catch (error) {
      this.logger.error('Failed to get market sentiment:', error);
      // Return a valid response even in error case
      return this.transformToMarketSentimentResponse({
        articles: [],
        analysis: `Failed to analyze market sentiment: ${error.message}`,
        structuredAnalysis: {
          analysis: 'Market analysis temporarily unavailable',
          sectors: [],
          marketSentiment: 'neutral',
          tickers: []
        }
      });
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
