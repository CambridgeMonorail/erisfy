import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OpenAiService } from './openai.service';
import { PromptRequestDto } from './dto/prompt-request.dto';
import { ContentAnalysisRequestDto } from './dto/content-analysis-request.dto';
import { ContentAnalysisResponseDto, MarketStoriesResponseDto, PromptResponseDto } from './dto/openai-response.dto';
import { NewsAnalysisRequestDto } from './dto/news-analysis.dto';
import { NewsAnalysisResponseDto, StructuredNewsAnalysisResponseDto } from './dto/news-analysis.dto';
import { NewsAnalysisState } from './interfaces/news-analysis.interface';

/**
 * Controller handling OpenAI-related endpoints
 */
@ApiTags('openai')
@Controller('openai')
export class OpenAiController {
  private readonly logger = new Logger(OpenAiController.name);

  constructor(private readonly openAiService: OpenAiService) {}

  /**
   * Get market stories analyzed by OpenAI
   */
  @Get('market-stories')
  @ApiOperation({ summary: 'Get current market stories analyzed by AI' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved market stories',
    type: MarketStoriesResponseDto
  })
  async getMarketStories(): Promise<MarketStoriesResponseDto> {
    this.logger.log('GET /openai/market-stories endpoint called');
    return this.openAiService.getMarketStories();
  }

  /**
   * Send a custom prompt to OpenAI
   */
  @Post('prompt')
  @ApiOperation({ summary: 'Send a custom prompt to OpenAI' })
  @ApiResponse({
    status: 200,
    description: 'Successfully processed prompt',
    type: PromptResponseDto
  })
  async sendPrompt(@Body() promptRequest: PromptRequestDto): Promise<PromptResponseDto> {
    this.logger.log(`POST /openai/prompt endpoint called with prompt: ${promptRequest.prompt.substring(0, 50)}...`);

    const response = await this.openAiService.sendPrompt(
      promptRequest.prompt,
      promptRequest.systemPrompt,
      promptRequest.temperature
    );

    return { response };
  }

  /**
   * Analyze content with OpenAI
   */
  @Post('analyze')
  @ApiOperation({ summary: 'Analyze content using OpenAI' })
  @ApiResponse({
    status: 200,
    description: 'Successfully analyzed content',
    type: ContentAnalysisResponseDto
  })
  async analyzeContent(@Body() request: ContentAnalysisRequestDto): Promise<ContentAnalysisResponseDto> {
    this.logger.log(`POST /openai/analyze endpoint called with content: ${request.content.substring(0, 50)}...`);

    const analysis = await this.openAiService.analyzeContent(
      request.content,
      request.analysisPrompt
    );

    return { analysis };
  }

  /**
   * Analyze news articles with OpenAI
   */
  @Post('news-analysis')
  @ApiOperation({ summary: 'Analyze news articles for market impact' })
  @ApiResponse({
    status: 200,
    description: 'Successfully analyzed news articles',
    type: NewsAnalysisResponseDto
  })
  async analyzeNews(@Body() request: NewsAnalysisRequestDto): Promise<NewsAnalysisResponseDto> {
    this.logger.log(`POST /openai/news-analysis endpoint called with ${request.articles.length} articles`);

    const state: NewsAnalysisState = {
      articles: request.articles,
      analysis: ''
    };

    const result = await this.openAiService.analyzeNews(state);

    return { analysis: result.analysis };
  }

  /**
   * Analyze news articles with OpenAI and return structured data
   */
  @Post('news-analysis/structured')
  @ApiOperation({ summary: 'Analyze news articles and return structured market impact data' })
  @ApiResponse({
    status: 200,
    description: 'Successfully analyzed news articles with structured output',
    type: StructuredNewsAnalysisResponseDto
  })
  async analyzeNewsStructured(@Body() request: NewsAnalysisRequestDto): Promise<StructuredNewsAnalysisResponseDto> {
    this.logger.log(`POST /openai/news-analysis/structured endpoint called with ${request.articles.length} articles`);

    const state: NewsAnalysisState = {
      articles: request.articles,
      analysis: ''
    };

    return await this.openAiService.analyzeNewsStructured(state);
  }
}
