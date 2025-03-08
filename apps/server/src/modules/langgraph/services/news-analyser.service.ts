import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BaseMessage } from "@langchain/core/messages";
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';

@Injectable()
export class NewsAnalyserService {
  private readonly logger = new Logger(NewsAnalyserService.name);
  private readonly llm: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    this.llm = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0,
      openAIApiKey: apiKey
    });
  }

  async analyseNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      if (!state.articles || state.articles.length === 0) {
        this.logger.warn('No articles provided for analysis');
        state.analysis = "No news articles found for analysis.";
        return state;
      }

      this.logger.log(`Starting analysis of ${state.articles.length} news articles`);

      // Log article details
      state.articles.forEach((article, index) => {
        this.logger.debug(`Article ${index + 1}:`, {
          title: article.title,
          description: article.description?.substring(0, 100) + '...',
          publishedAt: article.publishedAt
        });
      });

      // Construct the prompt
      const systemPrompt = new SystemMessage({
        content: `You are a financial analyst assistant. Analyze the provided news articles and explain:
          1. The key themes or events being discussed
          2. Potential impact on relevant stocks or market sectors
          3. Overall market sentiment (positive/negative/neutral)
          4. Any specific company names or stock tickers mentioned

          Be concise but thorough in your analysis.`
      });

      // Format articles for the prompt
      const newsContent = state.articles.map((article, i) =>
        `Article ${i + 1}:\nTitle: ${article.title}\nSummary: ${article.description}\n`
      ).join('\n');

      const userPrompt = new HumanMessage({
        content: `Please analyze these financial news articles:\n\n${newsContent}`
      });

      this.logger.debug('Sending prompts to LLM:', {
        systemPrompt: systemPrompt.content,
        userPrompt: String(userPrompt.content).substring(0, 200) + '...'
      });

      // Get analysis from LLM
      const response = await this.llm.invoke([systemPrompt, userPrompt]);

      // Safely extract text content from the response
      let analysisContent: string;
      if (response instanceof BaseMessage) {
        analysisContent = response.content.toString();
      } else if (typeof response === 'object' && response !== null) {
        analysisContent = JSON.stringify(response);
      } else {
        analysisContent = String(response);
      }

      this.logger.debug('LLM Analysis Response:', {
        analysis: analysisContent.substring(0, 200) + '...',
        responseType: response instanceof BaseMessage ? 'BaseMessage' : typeof response
      });

      state.analysis = analysisContent;

      // Try to extract stock tickers if not already provided
      if (!state.ticker) {
        const tickerMatch = state.analysis.match(/\b[A-Z]{1,5}\b/g); // Simple regex for tickers
        if (tickerMatch) {
          state.ticker = tickerMatch[0]; // Take the first match
          this.logger.debug('Extracted stock ticker:', { ticker: state.ticker });
        } else {
          this.logger.debug('No stock ticker found in analysis');
        }
      }

      this.logger.log('News analysis completed successfully');
      return state;

    } catch (error) {
      this.logger.error('Error analyzing news', {
        error: error.message,
        stack: error.stack,
        state: {
          articleCount: state.articles?.length,
          hasQuery: !!state.query,
          hasTicker: !!state.ticker
        }
      });
      state.error = `Failed to analyze news: ${error.message}`;
      return state;
    }
  }
}
