import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";
import { StructuredLLMResponse, MarketSentiment } from '../../openai/interfaces/news-analysis.interface';
import { DEFAULT_ANALYSIS_PROMPT, FOCUSED_ANALYSIS_PROMPT } from '../constants/llm-prompts';
import { TickerExtractorService } from './ticker-extractor.service';

@Injectable()
export class LLMAnalyzerService {
  private readonly logger = new Logger(LLMAnalyzerService.name);
  private readonly llm: ChatOpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly tickerExtractor: TickerExtractorService
  ) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    this.llm = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0,
      openAIApiKey: apiKey
    });
  }

  validateMarketSentiment(sentiment: unknown): MarketSentiment {
    if (sentiment === 'positive' || sentiment === 'negative' || sentiment === 'neutral') {
      return sentiment;
    }
    this.logger.warn(`Invalid market sentiment value: ${String(sentiment)}, defaulting to neutral`);
    return 'neutral';
  }

  async analyzeNewsContent(content: string, isDefaultQuery: boolean): Promise<StructuredLLMResponse> {
    const systemPrompt = new SystemMessage({
      content: isDefaultQuery ? DEFAULT_ANALYSIS_PROMPT : FOCUSED_ANALYSIS_PROMPT
    });

    const userPrompt = new HumanMessage({
      content: `Please analyze these financial news articles:\n\n${content}`
    });

    this.logger.debug('Sending prompts to LLM', {
      systemPromptLength: systemPrompt.content.length,
      userPromptLength: userPrompt.content.length
    });

    // First, extract tickers using our dedicated service
    const extractedTickers = this.tickerExtractor.extractTickersFromText(content);
    this.logger.debug('Extracted tickers from content:', { extractedTickers });

    const response = await this.llm.invoke([systemPrompt, userPrompt]);

    let analysisContent: string;
    if (response instanceof BaseMessage) {
      analysisContent = response.content?.toString() || '';
    } else if (typeof response === 'object' && response !== null) {
      analysisContent = JSON.stringify(response);
    } else {
      analysisContent = String(response || '');
    }

    try {
      const parsedAnalysis = JSON.parse(analysisContent) as StructuredLLMResponse;

      // Combine LLM-identified tickers with our extracted tickers
      const allTickers = new Set([
        ...extractedTickers,
        ...(parsedAnalysis.tickers || [])
      ]);

      parsedAnalysis.tickers = Array.from(allTickers);
      parsedAnalysis.marketSentiment = this.validateMarketSentiment(parsedAnalysis.marketSentiment);

      this.logger.debug('Processed analysis result:', {
        tickerCount: parsedAnalysis.tickers.length,
        sectors: parsedAnalysis.sectors,
        sentiment: parsedAnalysis.marketSentiment
      });

      return parsedAnalysis;
    } catch (error) {
      this.logger.error('Failed to parse LLM response:', error);
      throw new Error(`Failed to parse LLM response: ${error.message}`);
    }
  }
}
