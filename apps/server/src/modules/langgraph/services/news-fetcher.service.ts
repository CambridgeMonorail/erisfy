import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';

@Injectable()
export class NewsFetcherService {
  private readonly logger = new Logger(NewsFetcherService.name);
  private readonly newsApiToken: string;
  private readonly newsApiBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.newsApiToken = this.configService.getOrThrow<string>('NEWS_API_TOKEN');
    this.newsApiBaseUrl = this.configService.getOrThrow<string>('NEWS_API_BASE_URL');
  }

  async fetchNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    if (!state.query) {
      this.logger.warn('No query provided for news lookup');
      return state;
    }

    this.logger.log(`Fetching news for query: ${state.query}`);

    const url = `${this.newsApiBaseUrl}/all?search=${encodeURIComponent(state.query)}&language=en&api_token=${this.newsApiToken}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`TheNewsAPI request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Map the news articles to our interface format
      state.articles = data.data?.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.published_at
      })) || [];

      this.logger.log(`Retrieved ${state.articles.length} news articles`);
    } catch (error) {
      this.logger.error('Error fetching news', error);
      state.error = `Failed to fetch news: ${error.message}`;
    }

    return state;
  }
}
