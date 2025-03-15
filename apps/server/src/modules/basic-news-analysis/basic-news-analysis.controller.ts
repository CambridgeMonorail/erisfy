import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { BasicNewsAnalysisService } from './basic-news-analysis.service';
import {
  AnalyzeNewsDto,
  AnalysisResponseDto,
  HistoricalAnalysisQueryDto,
  HistoricalAnalysisResponseDto
} from './dto/basic-news-analysis.dto';

@ApiTags('basic-news-analysis')
@Controller('basic-news-analysis')
export class BasicNewsAnalysisController {
  private readonly logger = new Logger(BasicNewsAnalysisController.name);

  constructor(private basicNewsAnalysisService: BasicNewsAnalysisService) {}

  @Post('analyze')
  @ApiOperation({
    summary: 'Basic sentiment analysis of text content',
    description: `Simple rule-based analysis of news content without AI/LLM processing.

      Data Source:
      - Raw text input from user only
      - No external API calls or data enrichment

      Features:
      - Basic sentiment scoring (positive/negative/neutral)
      - Keyword/topic extraction
      - Simple market sector classification

      Storage:
      - Results stored in database for historical tracking

      Limitations:
      - No AI-powered analysis
      - No stock ticker extraction
      - No real-time market data

      For advanced AI-powered analysis with real-time data:
      - Use /news-analysis/analyze for multi-agent AI analysis
      - Use /openai/news-analysis for GPT-powered analysis
      - Use /market-insights for curated market news`
  })
  @ApiBody({
    description: 'News content to analyze',
    required: true,
    type: AnalyzeNewsDto
  })
  @ApiResponse({
    status: 200,
    description: 'Basic news analysis successful. Returns sentiment score, key topics, and market implications.',
    type: AnalysisResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request - Missing or malformed content'
  })
  async analyzeNews(@Body() analyzeNewsDto: AnalyzeNewsDto): Promise<AnalysisResponseDto> {
    this.logger.log('Received basic news analysis request');
    return this.basicNewsAnalysisService.analyzeNewsContent(analyzeNewsDto.content);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get historical basic analysis results',
    description: `Retrieves previously analyzed content from database.

      Data Source:
      - Database query of past basic analyses
      - No real-time updates

      Features:
      - Historical sentiment trends
      - Topic frequency analysis
      - Most recent first sorting

      Default Limit: 10 records

      For real-time market analysis history:
      - Use /market-insights/latest endpoint instead`
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Maximum number of historical records to return (default: 10)',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved historical analysis records with their sentiment scores and topics',
    type: HistoricalAnalysisResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters'
  })
  async getAnalysisHistory(
    @Query() query: HistoricalAnalysisQueryDto
  ): Promise<HistoricalAnalysisResponseDto> {
    this.logger.log('Received request for historical analysis');
    return this.basicNewsAnalysisService.getHistoricalAnalysis(query.limit);
  }
}
