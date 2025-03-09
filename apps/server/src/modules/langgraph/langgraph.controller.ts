import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { LangGraphService } from './langgraph.service';
import { AnalyzeNewsDto } from './dto/analyze-news.dto';
import { NewsAnalysisResponseDto } from './dto/news-analysis-response.dto';
import { NewsAnalysisState } from './interfaces/news-analysis-state.interface';

@ApiTags('AI News Analysis')
@ApiExtraModels(NewsAnalysisResponseDto)
@Controller('news-analysis')
export class LangGraphController {
  constructor(private readonly langGraphService: LangGraphService) {}

  @Post('analyze')
  @ApiOperation({
    summary: 'AI-powered financial news analysis',
    description: `
      Performs comprehensive analysis of financial news using an advanced multi-agent AI workflow:
      1. Intelligent news fetching and relevancy scoring
      2. In-depth AI analysis using GPT-4 for market insights
      3. Automated stock data correlation and ticker extraction

      Features:
      - Sophisticated news relevancy scoring
      - Deep market sentiment analysis
      - Automated stock ticker detection
      - Real-time market data integration

      If no query is provided, analyzes trending financial news of the day.
    `
  })
  @ApiResponse({
    status: 200,
    description: 'Advanced AI news analysis completed successfully',
    type: NewsAnalysisResponseDto,
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
  async analyzeNews(@Body() analyzeNewsDto: AnalyzeNewsDto): Promise<NewsAnalysisState> {
    const initialState: NewsAnalysisState = {
      query: '', // Will be set to default query by NewsFetcherService if empty
      articles: [],
      analysis: '',
      ticker: analyzeNewsDto.ticker,
      isDefaultQuery: !analyzeNewsDto.query // Flag indicating if we should use default query
    };

    if (analyzeNewsDto.query) {
      initialState.query = analyzeNewsDto.query;
    }

    return this.langGraphService.runWorkflow(initialState);
  }
}
