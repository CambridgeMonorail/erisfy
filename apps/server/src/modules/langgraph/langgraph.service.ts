import { Injectable, Logger } from '@nestjs/common';
import { RunnableSequence } from "@langchain/core/runnables";
import { NewsAnalysisState } from './interfaces/news-analysis-state.interface';
import { NewsFetcherService } from './services/news-fetcher.service';
import { NewsAnalyserService } from './services/news-analyser.service';
import { StockDataService } from './services/stock-data.service';

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
      // Step 2: Analyze News
      async ({ state }) => {
        const analysisState = await this.newsAnalyser.analyseNews(state);
        return { state: analysisState };
      },
      // Step 3: Fetch Stock Data
      async ({ state }) => {
        const finalState = await this.stockData.fetchStock(state);
        return { state: finalState };
      }
    ]);
  }

  async runWorkflow(initialState: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      const result = await this.workflow.invoke(initialState);
      return result.state;
    } catch (err) {
      this.logger.error('Error executing workflow', err);
      throw err;
    }
  }
}
