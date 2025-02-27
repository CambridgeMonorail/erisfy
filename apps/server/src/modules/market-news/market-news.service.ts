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
    const rawContent = await this.openAiService.getMarketStories();

    // 2) Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (err) {
      this.logger.error('Failed to parse ChatGPT response as JSON', err);
      return;
    }

    // 3) Save to Postgres
    try {
      await this.prisma.marketDataRecord.create({
        data: {
          date: parsed.date,
          stories: {
            create: parsed.stories.map((story) => ({
              title: story.title,
              one_line_summary: story.one_line_summary,
              whats_happening: story.whats_happening,
              market_impact: story.market_impact,
              market_sector: story.market_sector,
            })),
          },
        },
      });

      this.logger.log(`Saved market data for ${parsed.date}`);
    } catch (err) {
      this.logger.error('Failed to save market data to database', err);
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
