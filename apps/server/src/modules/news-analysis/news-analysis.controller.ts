import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsAnalysisService } from './news-analysis.service';
import {
  AnalyzeNewsDto,
  AnalysisResponseDto,
  HistoricalAnalysisQueryDto,
  HistoricalAnalysisResponseDto
} from './dto/news-analysis.dto';

@ApiTags('news-analysis')
@Controller('news-analysis')
export class NewsAnalysisController {
  private readonly logger = new Logger(NewsAnalysisController.name);

  constructor(private newsAnalysisService: NewsAnalysisService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze news content for market insights' })
  @ApiResponse({ status: 200, description: 'News analysis successful', type: AnalysisResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async analyzeNews(@Body() analyzeNewsDto: AnalyzeNewsDto): Promise<AnalysisResponseDto> {
    this.logger.log('Received analyze news request');
    return this.newsAnalysisService.analyzeNewsContent(analyzeNewsDto.content);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get historical news analysis results' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved historical analysis',
    type: HistoricalAnalysisResponseDto
  })
  async getAnalysisHistory(
    @Query() query: HistoricalAnalysisQueryDto
  ): Promise<HistoricalAnalysisResponseDto> {
    this.logger.log('Received request for historical analysis');
    return this.newsAnalysisService.getHistoricalAnalysis(query.limit);
  }
}
