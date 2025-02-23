import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma.service';
import axios from 'axios';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly apiUrl = process.env.NEWS_API_BASE_URL;
  private readonly apiToken = process.env.NEWS_API_TOKEN;

  constructor(private prisma: PrismaService) {}

  @Cron('0 8 * * *', {
    timeZone: 'UTC',
  })
  async fetchDailyNews() {
    this.logger.log('Running daily news fetch...');

    try {
      const response = await axios.get(`${this.apiUrl}/v1/news/top`, {
        params: {
          api_token: this.apiToken,
          locale: 'us',
          limit: 5,
        },
      });

      const articles = response.data.data;

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

      this.logger.log('Saved top 5 news articles');
    } catch (error) {
      this.logger.error('Failed to fetch or save news articles', error);
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
