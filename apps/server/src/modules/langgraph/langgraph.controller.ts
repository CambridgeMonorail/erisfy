import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LangGraphService } from './langgraph.service';
import { AnalyzeNewsDto } from './dto/analyze-news.dto';
import { NewsAnalysisResponseDto } from './dto/news-analysis-response.dto';
import { NewsAnalysisState } from './interfaces/news-analysis-state.interface';

@ApiTags('News Analysis')
@Controller('news-analysis')
export class LangGraphController {
  constructor(private readonly langGraphService: LangGraphService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze news for a given topic or stock' })
  @ApiResponse({
    status: 200,
    description: 'News analysis completed successfully',
    type: NewsAnalysisResponseDto
  })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error during analysis' })
  async analyzeNews(@Body() analyzeNewsDto: AnalyzeNewsDto): Promise<NewsAnalysisState> {
    return this.langGraphService.runWorkflow(analyzeNewsDto);
  }
}
