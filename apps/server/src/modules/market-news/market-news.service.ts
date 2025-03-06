import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenAiService } from '../openai/openai.service';
import { PrismaService } from '../../prisma.service';
import { NewsService } from '../news/news.service';

@Injectable()
export class MarketNewsService {
  private readonly logger = new Logger(MarketNewsService.name);

  constructor(
    private openAiService: OpenAiService,
    private prisma: PrismaService,
    private newsService: NewsService
  ) {}

  @Cron('0 8 * * *', {
    timeZone: 'UTC',
  })
  async fetchDailyMarketNews() {
    this.logger.log('Running daily market news fetch...');

    // 1) Query OpenAI
    try {
      // The getMarketStories method already returns a parsed object
      const marketStories = await this.openAiService.getMarketStories();

      // 3) Save to Postgres
      await this.prisma.marketDataRecord.create({
        data: {
          date: marketStories.date,
          stories: {
            create: marketStories.stories.map((story) => ({
              title: story.title,
              one_line_summary: story.one_line_summary,
              whats_happening: story.whats_happening,
              market_impact: story.market_impact,
              market_sector: story.market_sector,
            })),
          },
        },
      });

      this.logger.log(`Saved market data for ${marketStories.date}`);
    } catch (err) {
      this.logger.error('Failed to process market news', err);
      throw err;
    }
  }

  @Cron('0 8 * * *', {
    timeZone: 'UTC',
  })
  async fetchDailyNews() {
    this.logger.log('Running daily news fetch...');
    await this.newsService.fetchDailyNews();
  }

  async getLatestMarketNews() {
    const latestNews = await this.prisma.marketDataRecord.findFirst({
      include: {
        stories: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!latestNews) {
      throw new NotFoundException('No market news available');
    }

    return latestNews;
  }

  async triggerNewsUpdate() {
    this.logger.log('Triggering news update...');
    await this.fetchDailyNews();
    return { message: 'News update triggered' };
  }
}
