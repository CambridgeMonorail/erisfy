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

      // Debug log the incoming state
      this.logger.debug('Incoming state:', {
        articleCount: state.articles.length,
        query: state.query,
        ticker: state.ticker,
        isDefaultQuery: state.isDefaultQuery
      });

      // Log article details with validation
      state.articles.forEach((article, index) => {
        this.logger.debug(`Article ${index + 1} validation:`, {
          hasTitle: !!article.title,
          titleLength: article.title?.length,
          hasDescription: !!article.description,
          descriptionLength: article.description?.length,
          url: article.url,
          publishedAt: article.publishedAt
        });
      });

      // Construct the prompt - adjust based on whether it's default or specific query
      const systemPrompt = new SystemMessage({
        content: state.isDefaultQuery
          ? `You are a financial analyst assistant. Review these top financial news articles and provide:
              1. Overview of major market themes or events today
              2. Key sectors or industries affected
              3. Overall market sentiment (positive/negative/neutral)
              4. Notable company mentions or stock tickers

              Focus on the most impactful stories and their broader market implications.`
          : `You are a financial analyst assistant. Analyze the provided news articles and explain:
              1. The key themes or events being discussed
              2. Potential impact on relevant stocks or market sectors
              3. Overall market sentiment (positive/negative/neutral)
              4. Any specific company names or stock tickers mentioned

              Be concise but thorough in your analysis.`
      });

      // Format articles for the prompt with validation
      const newsContent = state.articles.map((article, i) => {
        const title = article.title?.trim() || 'No title available';
        const description = article.description?.trim() || 'No description available';
        return `Article ${i + 1}:\nTitle: ${title}\nSummary: ${description}\n`;
      }).join('\n');

      this.logger.debug('Formatted news content length:', {
        contentLength: newsContent.length,
        articleCount: state.articles.length
      });

      const userPrompt = new HumanMessage({
        content: `Please analyze these financial news articles:\n\n${newsContent}`
      });

      this.logger.debug('Sending prompts to LLM:', {
        systemPromptLength: systemPrompt.content.length,
        userPromptLength: userPrompt.content.length
      });

      // Get analysis from LLM
      const response = await this.llm.invoke([systemPrompt, userPrompt]);

      this.logger.debug('Raw LLM response:', {
        type: response instanceof BaseMessage ? 'BaseMessage' : typeof response,
        hasContent: response instanceof BaseMessage ? !!response.content : false
      });

      // Safely extract text content from the response
      let analysisContent: string;
      try {
        if (response instanceof BaseMessage) {
          analysisContent = response.content?.toString() || '';
        } else if (typeof response === 'object' && response !== null) {
          analysisContent = JSON.stringify(response);
        } else {
          analysisContent = String(response || '');
        }

        this.logger.debug('Processed analysis content:', {
          contentLength: analysisContent.length,
          hasContent: !!analysisContent,
          preview: analysisContent.substring(0, 100) + '...'
        });
      } catch (parseError) {
        this.logger.error('Error processing LLM response:', {
          error: parseError.message,
          responseType: typeof response,
          response: response instanceof BaseMessage ? 'BaseMessage' : response
        });
        throw parseError;
      }

      state.analysis = analysisContent;

      // Try to extract stock tickers if not already provided
      if (!state.ticker) {
        const tickerMatch = analysisContent.match(/\b[A-Z]{1,5}\b/g); // Simple regex for tickers
        if (tickerMatch) {
          state.ticker = tickerMatch[0]; // Take the first match
          this.logger.debug('Extracted stock ticker:', { ticker: state.ticker });
        } else {
          this.logger.debug('No stock ticker found in analysis');
        }
      }

      this.logger.log('News analysis completed successfully', {
        analysisLength: analysisContent.length,
        extractedTicker: state.ticker
      });

      return state;

    } catch (error) {
      this.logger.error('Error analyzing news:', {
        error: error.message,
        stack: error.stack,
        state: {
          articleCount: state.articles?.length,
          hasQuery: !!state.query,
          hasTicker: !!state.ticker,
          responseState: {
            hasAnalysis: !!state.analysis,
            analysisLength: state.analysis?.length
          }
        }
      });
      state.error = `Failed to analyze news: ${error.message}`;
      return state;
    }
  }
}
