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
        state.analysis = "No news articles found for analysis.";
        return state;
      }

      this.logger.log(`Analyzing ${state.articles.length} news articles`);

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

      // Get analysis from LLM
      const response = await this.llm.invoke([systemPrompt, userPrompt]);

      // Safely extract text content from the response
      if (response instanceof BaseMessage) {
        state.analysis = response.content.toString();
      } else if (typeof response === 'object' && response !== null) {
        state.analysis = JSON.stringify(response);
      } else {
        state.analysis = String(response);
      }

      // Try to extract stock tickers if not already provided
      if (!state.ticker) {
        const tickerMatch = state.analysis.match(/\b[A-Z]{1,5}\b/g); // Simple regex for tickers
        if (tickerMatch) {
          state.ticker = tickerMatch[0]; // Take the first match
        }
      }

      return state;

    } catch (error) {
      this.logger.error('Error analyzing news', error);
      state.error = `Failed to analyze news: ${error.message}`;
      return state;
    }
  }
}
