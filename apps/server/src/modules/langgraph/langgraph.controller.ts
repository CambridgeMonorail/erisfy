import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { LangGraphService } from './langgraph.service';
import { AnalyzeNewsDto } from './dto/analyze-news.dto';
import { NewsAnalysisResponseDto } from './dto/news-analysis-response.dto';
import { NewsAnalysisState } from './interfaces/news-analysis-state.interface';
import { MarketSentimentResponseDto } from './dto/market-sentiment-response.dto';

@ApiTags('news-analysis')
@ApiExtraModels(NewsAnalysisResponseDto, MarketSentimentResponseDto)
@Controller('news-analysis')
export class LangGraphController {
  constructor(private readonly langGraphService: LangGraphService) {}

  @Post('analyze')
  @ApiOperation({
    summary: 'Multi-agent AI news analysis pipeline',
    description: `Primary endpoint for comprehensive financial news analysis using an advanced multi-agent system.

      Data Sources:
      - Real-time news APIs (primary source)
      - Market data integration
      - Historical analysis database

      Pipeline Steps:
      1. Smart News Fetching
         - Automatic query enhancement
         - Relevancy scoring
         - Duplicate detection

      2. AI Analysis (GPT-4)
         - Deep market sentiment analysis
         - Sector impact assessment
         - Forward-looking predictions

      3. Market Data Integration
         - Automatic stock ticker extraction
         - Real-time price correlation
         - Trading volume analysis

      Features:
      - Most comprehensive analysis endpoint
      - Real-time data enrichment
      - Multi-source verification
      - Historical pattern matching

      Use Cases:
      - Market trend analysis
      - Stock screening
      - Sector analysis
      - Risk assessment

      For simpler alternatives:
      - Use /basic-news-analysis for quick text analysis
      - Use /openai/news-analysis for direct GPT access
      - Use /market-insights for pre-analyzed news`
  })
  @ApiResponse({
    status: 200,
    description: 'Advanced AI news analysis completed successfully',
    type: NewsAnalysisResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input parameters',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ticker symbol format',
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error during analysis',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error analyzing news content',
        error: 'Internal Server Error'
      }
    }
  })
  async analyzeNews(@Body() analyzeNewsDto: AnalyzeNewsDto = {}): Promise<NewsAnalysisState> {
    const initialState: NewsAnalysisState = {
      query: analyzeNewsDto.query || '',
      articles: [],
      analysis: '',
      tickers: analyzeNewsDto.tickers || [],
      isDefaultQuery: !analyzeNewsDto.query // Set to true when no query is provided
    };

    return this.langGraphService.runWorkflow(initialState);
  }

  @Get('market-sentiment')
  @ApiOperation({
    summary: 'Latest AI-powered market sentiment',
    description: `Retrieves current market sentiment from multi-agent analysis system.

      Data Sources:
      - Aggregated news analysis results
      - Real-time market indicators
      - Trading volume patterns

      Features:
      - Overall market sentiment score
      - Sector-specific sentiment
      - Key market drivers
      - Risk indicators

      Updates:
      - Real-time during market hours
      - End-of-day summary after hours

      For historical trends:
      - Use /basic-news-analysis/history endpoint
      - Use /market-insights for daily summaries`
  })
  @ApiResponse({
    status: 200,
    description: 'Latest market sentiment analysis retrieved successfully',
    type: MarketSentimentResponseDto
  })
  async getMarketSentiment(): Promise<MarketSentimentResponseDto> {
    return this.langGraphService.getMarketSentiment();
  }
}
