import { Controller, Get, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MarketNewsService } from './market-news.service';
import { PrismaService } from '../../prisma.service';

@Controller('market-insights')
export class MarketNewsController {
  constructor(
    private readonly marketNewsService: MarketNewsService,
    private prisma: PrismaService
  ) {}

  @Get('trigger')
  async triggerNewsUpdate() {
    try {
      await this.marketNewsService.fetchDailyMarketNews();
      return { message: 'Market news update triggered' };
    } catch {
      throw new InternalServerErrorException('Failed to fetch market news');
    }
  }

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
}
