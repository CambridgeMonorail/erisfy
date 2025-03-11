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
    summary: 'Simple analysis of news content',
    description: `Performs basic analysis of news content to extract sentiment and key topics.
      Data Source: Raw text input from user
      Processing: Basic NLP for sentiment and topic extraction
      Storage: Results stored in database for historical tracking
      For advanced AI-powered analysis, use the /news-analysis endpoint.`
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
    summary: 'Get historical basic news analysis results',
    description: `Retrieves previously analyzed news content and their results.
      Data Source: Database query of past analyses
      Sorting: Most recent first
      Default Limit: 10 records`
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
