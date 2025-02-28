import { Controller, Get, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MarketNewsService } from './market-news.service';
import { PrismaService } from '../../prisma.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('market-insights')
@Controller('market-insights')
export class MarketNewsController {
  constructor(
    private readonly marketNewsService: MarketNewsService,
    private prisma: PrismaService
  ) {}

  @ApiOperation({ summary: 'Trigger market news update', description: 'Manually triggers the market news fetch process' })
  @ApiResponse({ status: 200, description: 'Market news update triggered successfully', schema: { properties: { message: { type: 'string', example: 'Market news update triggered' } } } })
  @ApiResponse({ status: 500, description: 'Failed to fetch market news' })
  @Get('trigger')
  async triggerNewsUpdate() {
    try {
      await this.marketNewsService.fetchDailyMarketNews();
      return { message: 'Market news update triggered' };
    } catch {
      throw new InternalServerErrorException('Failed to fetch market news');
    }
  }

  @ApiOperation({ summary: 'Get latest market data', description: 'Returns the most recent market data record with associated stories' })
  @ApiResponse({ status: 200, description: 'Latest market news retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No market news data found' })
  @ApiResponse({ status: 500, description: 'Failed to fetch market news data' })
  @Get()
  async getLatestNews() {
    try {
      const latestRecord = await this.prisma.marketDataRecord.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          stories: true,
        },
      });

      if (!latestRecord) {
        throw new NotFoundException('No market news data found');
      }

      return latestRecord;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch market news data');
    }
  }

  @ApiOperation({ summary: 'Get latest market news (alternative)', description: 'Returns the latest market news using an alternative service method' })
  @ApiResponse({ status: 200, description: 'Latest market news retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No market news data found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('latest')
  async getLatest() {
    return this.marketNewsService.getLatestMarketNews();
  }

  @ApiOperation({ summary: 'Trigger general news update', description: 'Triggers an update for general news' })
  @ApiResponse({ status: 200, description: 'General news update triggered successfully', schema: { properties: { message: { type: 'string', example: 'General news update triggered' } } } })
  @ApiResponse({ status: 500, description: 'Failed to fetch general news' })
  @Get('news-trigger')
  async triggerGeneralNewsUpdate() {
    try {
      await this.marketNewsService.triggerNewsUpdate();
      return { message: 'General news update triggered' };
    } catch {
      throw new InternalServerErrorException('Failed to fetch general news');
    }
  }
}
