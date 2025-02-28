import { Controller, Get, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Get latest news', description: 'Returns the most recent news data' })
  @ApiResponse({ status: 200, description: 'Latest news retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No news data found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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

  @ApiOperation({ summary: 'Trigger news update', description: 'Manually triggers a daily news update' })
  @ApiResponse({ status: 200, description: 'News update triggered successfully', schema: { properties: { message: { type: 'string', example: 'News update triggered' } } } })
  @ApiResponse({ status: 500, description: 'Failed to fetch news' })
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
