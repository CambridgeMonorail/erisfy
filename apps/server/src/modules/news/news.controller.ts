import { Controller, Get, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('latest')
  async getLatestNews() {
    try {
      const latestNews = await this.newsService.getLatestNews();
      if (!latestNews) {
        throw new NotFoundException('No news data found');
      }
      return latestNews;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch news data');
    }
  }

  @Get('trigger')
  async triggerNewsUpdate() {
    try {
      await this.newsService.fetchDailyNews();
      return { message: 'News update triggered' };
    } catch {
      throw new InternalServerErrorException('Failed to fetch news');
    }
  }
}
