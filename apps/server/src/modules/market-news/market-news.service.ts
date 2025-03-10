import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenAiService } from '../openai/openai.service';
import { PrismaService } from '../../prisma.service';
import { NewsService } from '../news/news.service';
import { TavilyService } from '../tavily/tavily.service';

@Injectable()
export class MarketNewsService {
  private readonly logger = new Logger(MarketNewsService.name);

  constructor(
    private openAiService: OpenAiService,
    private prisma: PrismaService,
    private newsService: NewsService,
    private tavilyService: TavilyService
  ) {}

  @Cron('0 8 * * *', {
    timeZone: 'UTC',
  })
  async fetchDailyMarketNews() {
    this.logger.log('Running daily market news fetch...');

    try {
      // 1) Fetch news from Tavily
      const searchResult = await this.tavilyService.search({
        query: 'today financial market important news',
        search_depth: 'advanced',
        include_domains: ['reuters.com', 'bloomberg.com', 'wsj.com', 'ft.com', 'marketwatch.com'],
      });

      // 2) Process through OpenAI
      const marketStories = await this.openAiService.interpretMarketStories(
        searchResult.results.map(result => ({
          title: result.title,
          description: result.description || result.content
        }))
      );

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
