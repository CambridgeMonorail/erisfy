import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';

@Injectable()
export class NewsFetcherService {
  private readonly logger = new Logger(NewsFetcherService.name);
  private readonly newsApiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.newsApiKey = this.configService.getOrThrow<string>('NEWS_API_KEY');
  }

  async fetchNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      this.logger.log(`Fetching news for query: ${state.query}`);

      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(state.query)}&apiKey=${this.newsApiKey}&language=en&sortBy=publishedAt&pageSize=5`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`News API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Map the news articles to our interface format
      state.articles = data.articles?.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt
      })) || [];

      this.logger.log(`Retrieved ${state.articles.length} news articles`);
      return state;

    } catch (error) {
      this.logger.error('Error fetching news', error);
      state.error = `Failed to fetch news: ${error.message}`;
      return state;
    }
  }
}
