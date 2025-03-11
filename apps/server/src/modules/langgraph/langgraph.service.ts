import { Injectable, Logger } from '@nestjs/common';
import { RunnableSequence } from "@langchain/core/runnables";
import { NewsAnalysisState } from './interfaces/news-analysis-state.interface';
import { NewsFetcherService } from './services/news-fetcher.service';
import { NewsAnalyserService } from './services/news-analyser.service';
import { StockDataService } from './services/stock-data.service';
import { MarketSentimentResponseDto, SentimentType } from './dto/market-sentiment-response.dto';

@Injectable()
export class LangGraphService {
  private readonly logger = new Logger(LangGraphService.name);
  private readonly workflow: RunnableSequence;

  constructor(
    private readonly newsFetcher: NewsFetcherService,
    private readonly newsAnalyser: NewsAnalyserService,
    private readonly stockData: StockDataService,
  ) {
    // Create a sequential workflow that passes state through each step
    this.workflow = RunnableSequence.from([
      // Step 1: Fetch News
      async (state: NewsAnalysisState) => {
        const newsState = await this.newsFetcher.fetchNews(state);
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

  async getMarketSentiment(): Promise<MarketSentimentResponseDto> {
    const initialState: NewsAnalysisState = {
      query: '',
      articles: [],
      analysis: '',
      isDefaultQuery: true
    };

    try {
      const result = await this.workflow.invoke(initialState);
      return this.transformToMarketSentimentResponse(result.state);
    } catch (err) {
      this.logger.error('Error getting market sentiment', err);
      throw err;
    }
  }
}
