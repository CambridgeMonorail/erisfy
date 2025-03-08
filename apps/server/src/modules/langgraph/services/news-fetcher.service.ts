import { Injectable, Logger } from '@nestjs/common';
import { NewsService } from '../../news/news.service';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';

@Injectable()
export class NewsFetcherService {
  private readonly logger = new Logger(NewsFetcherService.name);

  constructor(private readonly newsService: NewsService) {}

  async fetchNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    if (!state.query) {
      this.logger.warn('No query provided for news lookup');
      return state;
    }

    this.logger.log(`Fetching news for query: ${state.query}`);

    try {
      const articles = await this.newsService.queryNews(state.query);
      state.articles = articles;
      this.logger.log(`Retrieved ${articles.length} news articles`);
    } catch (error) {
      this.logger.error('Error fetching news', error);
      state.error = `Failed to fetch news: ${error.message}`;
    }

    return state;
  }
}
