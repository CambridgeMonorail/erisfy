import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";
import { StructuredLLMResponse, MarketSentiment } from '../../openai/interfaces/news-analysis.interface';
import { DEFAULT_ANALYSIS_PROMPT, FOCUSED_ANALYSIS_PROMPT } from '../constants/llm-prompts';

@Injectable()
export class LLMAnalyzerService {
  private readonly logger = new Logger(LLMAnalyzerService.name);
  private readonly llm: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
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
      parsedAnalysis.marketSentiment = this.validateMarketSentiment(parsedAnalysis.marketSentiment);
      return parsedAnalysis;
    } catch (error) {
      this.logger.error('Failed to parse LLM response:', error);
      throw new Error(`Failed to parse LLM response: ${error.message}`);
    }
  }
}
