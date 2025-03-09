import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BaseMessage } from "@langchain/core/messages";
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { StructuredLLMResponse } from '../../openai/interfaces/news-analysis.interface';

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
        tickers: state.tickers,
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
          ? `You are a financial analyst assistant. Review these top financial news articles and provide a response as a JSON object with the following keys:
      {
        "analysis": "<A concise overview of the major market themes or events today>",
        "sectors": ["<list of key sectors or industries affected>"],
        "marketSentiment": "<one of: positive, negative, neutral>",
        "tickers": ["<list of notable company mentions or stock tickers>"]
      }

      Example output:
      {
        "analysis": "The S&P 500 experienced a decline due to tariff concerns and market uncertainty.",
        "sectors": ["Financials", "Technology"],
        "marketSentiment": "negative",
        "tickers": ["SPY", "AAPL"]
      }

      Focus on the most impactful stories and their broader market implications.
      Return only the JSON object without any additional text.`
          : `You are a financial analyst assistant. Analyse the provided news articles and provide a response as a JSON object with the following keys:
      {
        "analysis": "<A concise explanation of the key themes or events being discussed>",
        "sectors": ["<list of impacted market sectors or industries>"],
        "marketSentiment": "<one of: positive, negative, neutral>",
        "tickers": ["<list of specific company names or stock tickers mentioned>"]
      }

      Example output:
      {
        "analysis": "Market uncertainty remains as trade tensions affect tech and financial sectors.",
        "sectors": ["Technology", "Financials"],
        "marketSentiment": "negative",
        "tickers": ["GOOG", "MSFT"]
      }

      Be concise but thorough in your analysis.
      Return only a valid JSON object with no extra commentary.`
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

      // Add detailed content logging for development
      this.logger.debug('System Prompt Content:', {
        content: systemPrompt.content
      });
      this.logger.debug('User Prompt Content:', {
        content: userPrompt.content
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

        // Store raw analysis content
        state.analysis = analysisContent;

        // Try to parse the JSON response
        try {
          const parsedAnalysis = JSON.parse(analysisContent) as StructuredLLMResponse;
          state.structuredAnalysis = parsedAnalysis;

          // Update tickers from structured response
          if (parsedAnalysis.tickers && parsedAnalysis.tickers.length > 0) {
            state.tickers = parsedAnalysis.tickers;
          }

          // Update sentiment and sectors
          if (parsedAnalysis.marketSentiment) {
            state.sentiment = parsedAnalysis.marketSentiment;
          }

          if (parsedAnalysis.sectors && parsedAnalysis.sectors.length > 0) {
            state.sectors = parsedAnalysis.sectors;
          }

          this.logger.debug('Parsed structured analysis:', {
            hasAnalysis: !!parsedAnalysis.analysis,
            sectorCount: parsedAnalysis.sectors.length,
            tickerCount: parsedAnalysis.tickers.length,
            sentiment: parsedAnalysis.marketSentiment,
            sectors: parsedAnalysis.sectors.join(', ')
          });
        } catch (parseError) {
          this.logger.warn('Failed to parse structured analysis - falling back to regex extraction:', {
            error: parseError.message,
            rawContent: analysisContent.substring(0, 100) + '...'
          });

          // Fallback to regex extraction for tickers
          const tickerMatch = analysisContent.match(/\b[A-Z]{1,5}\b/g);
          if (tickerMatch) {
            state.tickers = [...new Set(tickerMatch)]; // Remove duplicates
          }
        }

        this.logger.debug('Final analysis state:', {
          hasStructuredAnalysis: !!state.structuredAnalysis,
          tickersFound: state.tickers?.length || 0,
          allTickers: state.tickers?.join(', ') || 'none',
          sentiment: state.sentiment || 'unknown',
          sectors: state.sectors?.join(', ') || 'none'
        });

      } catch (parseError) {
        this.logger.error('Error processing LLM response:', {
          error: parseError.message,
          responseType: typeof response,
          response: response instanceof BaseMessage ? 'BaseMessage' : response
        });
        throw parseError;
      }

      this.logger.log('News analysis completed successfully', {
        analysisLength: analysisContent.length,
        hasStructuredData: !!state.structuredAnalysis,
        extractedTickers: state.tickers?.join(', ') || 'none',
        sentiment: state.sentiment,
        sectorCount: state.sectors?.length || 0
      });

      return state;

    } catch (error) {
      this.logger.error('Error analyzing news:', {
        error: error.message,
        stack: error.stack,
        state: {
          articleCount: state.articles?.length,
          hasQuery: !!state.query,
          hasTickers: !!state.tickers?.length,
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
