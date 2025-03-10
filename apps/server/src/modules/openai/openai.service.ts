import { Injectable, Logger } from '@nestjs/common';
import { OpenAiException } from './exceptions/openai.exception';
import { MarketStoriesResponse } from './interfaces/market-stories.interface';
import { OpenAiConfigProvider } from './providers/openai-config.provider';
import { OpenAIMessage } from './interfaces/openai-message.interface';
import { NewsAnalysisState, StructuredNewsAnalysis } from './interfaces/news-analysis.interface';

/**
 * Service responsible for interacting with the OpenAI API
 * Handles request formatting, response parsing and error handling
 */
@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);

  constructor(private readonly openAiConfigProvider: OpenAiConfigProvider) {}

  /**
   * Retrieves market stories using OpenAI
   * @returns Structured market stories response as JSON
   * @throws OpenAiException if the API call fails
   */
  async getMarketStories(): Promise<MarketStoriesResponse> {
    try {
      this.logger.log('Requesting market stories from OpenAI');

      const prompt = this.getMarketStoriesPrompt();
      const messages: OpenAIMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful financial assistant who responds with clean, properly formatted JSON without any Markdown formatting.'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      const rawContent = await this.sendCompletionRequest(messages, 0.3);

      try {
        return JSON.parse(rawContent) as MarketStoriesResponse;
      } catch (parseError) {
        this.logger.error(`Failed to parse OpenAI response: ${parseError.message}`);
        throw new OpenAiException('Invalid response format from OpenAI');
      }
    } catch (error) {
      this.logger.error(`OpenAI API error: ${error.message}`);
      if (error instanceof OpenAiException) {
        throw error;
      }
      throw new OpenAiException(
        error.message || 'Failed to communicate with OpenAI API',
        error.status || 500
      );
    }
  }

  /**
   * Interprets news stories and structures them into market insights
   * @param stories Array of news stories to interpret
   * @returns Structured market stories response as JSON
   * @throws OpenAiException if the API call fails
   */
  async interpretMarketStories(stories: Array<{ title: string; description: string }>): Promise<MarketStoriesResponse> {
    try {
      this.logger.log('Interpreting market stories with OpenAI');

      const prompt = `Review these news stories and identify the five biggest stories that are likely to impact financial markets and stock prices:\n\n${
        stories.map((story, i) => `Story ${i + 1}:\nTitle: ${story.title}\nDescription: ${story.description}\n`).join('\n')
      }\n\nAnalyze these stories and structure the data as JSON with the following format:
      {
        "date": "${new Date().toISOString().split('T')[0]}",
        "stories": [
          {
            "title": "Story title",
            "one_line_summary": "Brief one-line summary",
            "whats_happening": "Detailed explanation",
            "market_impact": "Expected market impact",
            "market_sector": "Affected market sector"
          }
        ]
      }`;

      const messages: OpenAIMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful financial assistant who responds with clean, properly formatted JSON without any Markdown formatting.'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      const rawContent = await this.sendCompletionRequest(messages, 0.3);

      try {
        return JSON.parse(rawContent) as MarketStoriesResponse;
      } catch (parseError) {
        this.logger.error(`Failed to parse OpenAI response: ${parseError.message}`);
        throw new OpenAiException('Invalid response format from OpenAI');
      }
    } catch (error) {
      this.logger.error(`OpenAI API error: ${error.message}`);
      if (error instanceof OpenAiException) {
        throw error;
      }
      throw new OpenAiException(
        error.message || 'Failed to communicate with OpenAI API',
        error.status || 500
      );
    }
  }

  /**
   * Analyzes news articles and their potential market impact
   * @param state News analysis state containing articles to analyze
   * @param structured Whether to return a structured analysis (JSON) or free text
   * @returns Updated news analysis state with analysis field populated
   * @throws OpenAiException if the API call fails
   */
  async analyzeNews(state: NewsAnalysisState, structured = false): Promise<NewsAnalysisState> {
    if (!state.articles || state.articles.length === 0) {
      state.analysis = 'No news articles found.';
      return state;
    }

    try {
      this.logger.log(`Analyzing ${state.articles.length} news articles with OpenAI`);

      const prompt = this.buildNewsAnalysisPrompt(state, structured);
      const messages: OpenAIMessage[] = [
        {
          role: 'system',
          content: structured
            ? 'You are a financial analyst assistant who responds with clean, properly formatted JSON without any Markdown formatting.'
            : 'You are a financial analyst assistant who provides concise, actionable insights on market news.'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      const rawContent = await this.sendCompletionRequest(messages, 0.3);
      state.analysis = rawContent;

      return state;
    } catch (error) {
      this.logger.error(`News analysis error: ${error.message}`, error.stack);
      if (error instanceof OpenAiException) {
        state.error = error.message;
      } else {
        state.error = 'Failed to analyze news articles.';
      }
      state.analysis = 'Analysis failed due to an error.';
      return state;
    }
  }

  /**
   * Analyzes news articles and returns structured insights in JSON format
   * @param state News analysis state containing articles to analyze
   * @returns Structured news analysis result
   * @throws OpenAiException if the API call fails or parsing fails
   */
  async analyzeNewsStructured(state: NewsAnalysisState): Promise<StructuredNewsAnalysis> {
    const result = await this.analyzeNews({...state}, true);

    if (result.error) {
      throw new OpenAiException(result.error);
    }

    try {
      return JSON.parse(result.analysis) as StructuredNewsAnalysis;
    } catch (parseError) {
      this.logger.error(`Failed to parse structured news analysis: ${parseError.message}`);
      throw new OpenAiException('Invalid response format from news analysis');
    }
  }

  /**
   * Builds a prompt for news article analysis
   * @param state The news analysis state
   * @param structured Whether to request structured JSON output
   * @returns Formatted prompt string
   */
  private buildNewsAnalysisPrompt(state: NewsAnalysisState, structured: boolean): string {
    let prompt = 'Analyze the following news articles and their impact on financial markets and stocks:\n\n';

    // Add each article to the prompt
    state.articles.forEach((article, index) => {
      prompt += `Article ${index + 1}: ${article.title}\n`;
      prompt += `Description: ${article.description}\n`;
      if (article.publishedAt) {
        prompt += `Published: ${article.publishedAt}\n`;
      }
      prompt += '\n';
    });

    if (structured) {
      prompt += `
Please analyze these articles and provide a structured response in the following JSON format:
{
  "sentiment": "positive|negative|neutral|mixed",
  "themes": ["theme1", "theme2", ...],
  "marketImpacts": [
    {
      "sector": "sector name",
      "impact": "description of impact",
      "sentiment": "positive|negative|neutral"
    },
    ...
  ],
  "summary": "overall concise summary of market implications"
}
`;
    } else {
      prompt += `
Please provide:
1. A brief summary of the key themes in these articles
2. Analysis of potential market impacts
3. Sectors or industries most likely to be affected
4. Overall market sentiment derived from these news items
`;
    }

    return prompt;
  }

  /**
   * Sends a custom prompt to OpenAI and returns the response
   * @param prompt The prompt to send to OpenAI
   * @param systemPrompt Optional system prompt to guide the response
   * @param temperature Sampling temperature (0-1)
   * @returns The raw response string from OpenAI
   * @throws OpenAiException if the API call fails
   */
  async sendPrompt(
    prompt: string,
    systemPrompt = 'You are a helpful AI assistant.',
    temperature = 0.7
  ): Promise<string> {
    try {
      this.logger.log('Sending custom prompt to OpenAI');

      const messages: OpenAIMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ];

      return await this.sendCompletionRequest(messages, temperature);
    } catch (error) {
      this.logger.error(`OpenAI API error: ${error.message}`);
      if (error instanceof OpenAiException) {
        throw error;
      }
      throw new OpenAiException(
        error.message || 'Failed to communicate with OpenAI API',
        error.status || 500
      );
    }
  }

  /**
   * Analyzes text content to extract key information and sentiment
   * @param content Text content to analyze
   * @param analysisPrompt Optional custom analysis prompt
   * @returns Structured analysis as JSON string
   */
  async analyzeContent(content: string, analysisPrompt?: string): Promise<string> {
    const prompt = analysisPrompt || `
      Analyze the following content for key topics, sentiment, and market implications:

      ${content}

      Provide a JSON response with the following structure:
      {
        "sentiment": "positive|negative|neutral",
        "keyTopics": ["topic1", "topic2", ...],
        "marketImplications": ["implication1", "implication2", ...],
      }
    `;

    const systemPrompt = 'You are a financial analyst. Respond with clean, properly formatted JSON without any Markdown formatting.';

    return await this.sendPrompt(prompt, systemPrompt, 0.3);
  }

  /**
   * Core method to send chat completion requests to the OpenAI API
   * @param messages Array of message objects for the conversation
   * @param temperature Sampling temperature for controlling randomness
   * @returns Processed response content
   * @throws OpenAiException for any API errors
   */
  private async sendCompletionRequest(messages: OpenAIMessage[], temperature = 0.7): Promise<string> {
    try {
      const response = await this.openAiConfigProvider.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        temperature,
      });

      const rawContent = response.choices[0].message?.content || '';
      return this.extractJsonFromMarkdown(rawContent);
    } catch (error) {
      this.logger.error(`OpenAI API call failed: ${error.message}`);
      throw new OpenAiException(
        error.message || 'Failed to communicate with OpenAI API',
        error.status || 500
      );
    }
  }

  /**
   * Gets the prompt for market stories generation
   * @returns Formatted prompt string
   */
  private getMarketStoriesPrompt(): string {
    return `
      Identify the five biggest news stories today that are likely to impact the financial markets
      and the price of stocks, either positively or negatively. Then structure that data as JSON
      with the following structure:

      {
        "date": "<YYYY-MM-DD>",
        "stories": [
          {
            "title": "...",
            "one_line_summary": "...",
            "whats_happening": "...",
            "market_impact": "...",
            "market_sector": "..."
          },
          ...
        ]
      }
    `;
  }

  /**
   * Extracts JSON content from a string that might contain Markdown formatting
   * @param content - Raw content that may contain Markdown formatting like ```json blocks
   * @returns Cleaned JSON string
   */
  private extractJsonFromMarkdown(content: string): string {
    // Remove Markdown code block indicators (```json, ```)
    const jsonRegex = /```(?:json)?\s*([\s\S]*?)```/;
    const match = content.match(jsonRegex);

    if (match && match[1]) {
      // Return just the JSON inside the code block
      return match[1].trim();
    }

    // If no code blocks found, return the original content with leading/trailing whitespace removed
    return content.trim();
  }
}
