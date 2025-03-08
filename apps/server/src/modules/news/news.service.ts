import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma.service';
import axios from 'axios';

interface NewsApiResponse {
  data: {
    title: string;
    description: string;
    source: string;
    published_at: string;
    url: string;
    categories: string[];
  }[];
}

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly apiUrl = process.env.NEWS_API_BASE_URL;
  private readonly apiToken = process.env.NEWS_API_TOKEN;

  constructor(private prisma: PrismaService) {}

  private validateApiConfig() {
    if (!this.apiUrl || !this.apiToken) {
      const error = 'Missing NEWS_API_BASE_URL or NEWS_API_TOKEN environment variables';
      this.logger.error(error);
      throw new Error(error);
    }
  }

  private async callNewsApi(endpoint: string, params: Record<string, any>) {
    this.validateApiConfig();

    try {
      const response = await axios.get<NewsApiResponse>(`${this.apiUrl}${endpoint}`, {
        params: {
          api_token: this.apiToken,
          language: 'en',
          ...params,
        },
      });

      if (!response.data?.data) {
        throw new Error('Invalid response format from news API');
      }

      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to fetch from news API', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
      throw error;
    }
  }

  @Cron('0 8 * * *', {
    timeZone: 'UTC',
  })
  async fetchDailyNews() {
    this.logger.log('Running daily news fetch...');

    try {
      const articles = await this.callNewsApi('/top', {
        categories: 'business',
        exclude_source_ids: 'gamereactor.eu',
        limit: 5,
      });

      await this.prisma.newsArticle.createMany({
        data: articles.map((article) => ({
          title: article.title,
          description: article.description,
          source: article.source,
          publishedAt: new Date(article.published_at),
          url: article.url,
          category: article.categories.join(', '),
        })),
        skipDuplicates: true,
      });

      this.logger.log('Saved top 5 market-relevant news articles');
    } catch (error) {
      this.logger.error('Failed to save news articles', error);
      throw error;
    }
  }

  async queryNews(query: string) {
    this.logger.log(`Querying news for: ${query}`);
    this.logger.debug('API Request details:', {
      url: `${this.apiUrl}/all`,
      params: {
        search: query,
        api_token: '[REDACTED]',
        language: 'en'
      }
    });

    try {
      const articles = await this.callNewsApi('/all', { search: query });
      this.logger.debug('API Response:', {
        articleCount: articles.length,
        firstArticle: articles[0]
      });

      return articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.published_at,
        source: article.source,
        category: article.categories?.join(', '),
      }));
    } catch (error) {
      this.logger.error('News query failed:', {
        query,
        error: error.message,
        response: error.response?.data
      });
      throw error;
    }
  }

  async getLatestNews() {
    return this.prisma.newsArticle.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      take: 5,
    });
  }
}
