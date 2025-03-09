import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    description: 'Performs basic analysis of news content to extract sentiment and key topics. For advanced AI-powered analysis, use the /news-analysis endpoint.'
  })
  @ApiResponse({ status: 200, description: 'Basic news analysis successful', type: AnalysisResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async analyzeNews(@Body() analyzeNewsDto: AnalyzeNewsDto): Promise<AnalysisResponseDto> {
    this.logger.log('Received basic news analysis request');
    return this.basicNewsAnalysisService.analyzeNewsContent(analyzeNewsDto.content);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get historical basic news analysis results' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved historical analysis',
    type: HistoricalAnalysisResponseDto
  })
  async getAnalysisHistory(
    @Query() query: HistoricalAnalysisQueryDto
  ): Promise<HistoricalAnalysisResponseDto> {
    this.logger.log('Received request for historical analysis');
    return this.basicNewsAnalysisService.getHistoricalAnalysis(query.limit);
  }
}
