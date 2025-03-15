import {
  Controller,
  Get,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MarketNewsService } from './market-news.service';
import { PrismaService } from '../../prisma.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('market-insights')
@Controller('market-insights')
export class MarketNewsController {
  constructor(
    private readonly marketNewsService: MarketNewsService,
    private prisma: PrismaService,
  ) {}

  @ApiOperation({
    summary: 'Trigger market news update',
    description: `Manually triggers the market news curation pipeline.

      Process:
      - Fetches from multiple news sources
      - Applies AI analysis pipeline
      - Updates market insights database
      - Generates curated story summaries

      Frequency:
      - Auto-updates every market day
      - Manual trigger for immediate update

      Access Level:
      - Admin/internal use only
      - Rate limited to prevent API abuse`
  })
  @ApiResponse({
    status: 200,
    description: 'Market news update triggered successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Market news update triggered',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch or process market news',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Failed to fetch market news',
        },
        statusCode: {
          type: 'number',
          example: 500,
        },
      },
    },
  })
  @Get('trigger')
  async triggerNewsUpdate() {
    try {
      await this.marketNewsService.fetchDailyMarketNews();
      return { message: 'Market news update triggered' };
    } catch {
      throw new InternalServerErrorException('Failed to fetch market news');
    }
  }

  @ApiOperation({
    summary: 'Get latest market insights',
    description: `Returns comprehensive market insights with curated analysis.

      Data Sources:
      - Aggregated financial news
      - AI analysis results
      - Market data correlation
      - Expert validations

      Content Types:
      - Market summaries
      - Key story analysis
      - Sector impacts
      - Trading implications

      Features:
      - Premium curated content
      - Expert-reviewed insights
      - Market context included

      Update Schedule:
      - Real-time critical updates
      - Regular daily summaries
      - End-of-day wrap-up

      For raw analysis:
      - Use /news-analysis/analyze for AI pipeline
      - Use /openai/news-analysis for GPT access`
  })
  @ApiResponse({
    status: 200,
    description: 'Latest market news retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        date: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        stories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              one_line_summary: { type: 'string' },
              whats_happening: { type: 'string' },
              market_impact: { type: 'string' },
              market_sector: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No market news data found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'No market news data found',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal server error occurred while fetching market news data',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Failed to fetch market news data',
        },
        statusCode: {
          type: 'number',
          example: 500,
        },
      },
    },
  })
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
      throw new InternalServerErrorException(
        'Failed to fetch market news data',
      );
    }
  }

  @ApiOperation({
    summary: 'Get latest market news',
    description: `Returns optimized market news and analysis feed.

      Optimizations:
      - Smart content caching
      - Relevancy filtering
      - Duplicate removal
      - Priority sorting

      Content Includes:
      - Breaking market news
      - Impact summaries
      - Sector analysis
      - Trading signals

      Performance:
      - Fast response times
      - Bandwidth efficient
      - Cache-optimized

      For deeper analysis:
      - Use /news-analysis/analyze for full AI pipeline
      - Use /basic-news-analysis for simple analysis`
  })
  @ApiResponse({
    status: 200,
    description: 'Latest market news retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        date: { type: 'string', format: 'date-time' },
        stories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              one_line_summary: { type: 'string' },
              whats_happening: { type: 'string' },
              market_impact: { type: 'string' },
              market_sector: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No market news data available',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'No market news available',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Internal server error',
        },
        statusCode: {
          type: 'number',
          example: 500,
        },
      },
    },
  })
  @Get('latest')
  async getLatest() {
    return this.marketNewsService.getLatestMarketNews();
  }
}
