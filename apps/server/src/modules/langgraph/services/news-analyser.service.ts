import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BaseMessage } from "@langchain/core/messages";
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { StructuredLLMResponse, MarketSentiment, NewsArticle } from '../../openai/interfaces/news-analysis.interface';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class NewsAnalyserService {
  private readonly logger = new Logger(NewsAnalyserService.name);
  private readonly llm: ChatOpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    this.llm = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0,
      openAIApiKey: apiKey
    });
  }

  private validateMarketSentiment(sentiment: unknown): MarketSentiment {
    if (sentiment === 'positive' || sentiment === 'negative' || sentiment === 'neutral') {
      return sentiment;
    }
    // Default to neutral if invalid value is provided
    this.logger.warn(`Invalid market sentiment value: ${String(sentiment)}, defaulting to neutral`);
    return 'neutral';
  }

  async analyseNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      if (!state.articles || state.articles.length === 0) {
        this.logger.warn('No articles provided for analysis');
        state.analysis = "No news articles found for analysis.";
        return state;
      }

      // Check for existing recent analysis
      const existingAnalysis = await this.findRecentAnalysis(state);
      if (existingAnalysis) {
        this.logger.log('Found recent analysis in database');

        // Get associated stock data snapshots
        const stockSnapshots = await this.prisma.stockDataSnapshot.findMany({
          where: {
            analysisResults: {
              some: {
                id: existingAnalysis.id
              }
            }
          }
        });

        // Convert to StockInfo format
        if (stockSnapshots.length > 0) {
          state.stockInfoMap = {};
          stockSnapshots.forEach(snapshot => {
            state.stockInfoMap[snapshot.ticker] = {
              ticker: snapshot.ticker,
              price: snapshot.price,
              dayChange: snapshot.dayChange,
              dayChangePercent: snapshot.dayChangePercent,
              marketCap: snapshot.marketCap,
              time: snapshot.snapshotTime.toISOString()
            };
          });
          // Set first snapshot as primary stockInfo
          state.stockInfo = state.stockInfoMap[stockSnapshots[0].ticker];
        }

        state.analysis = existingAnalysis.analysis;
        state.structuredAnalysis = {
          analysis: existingAnalysis.analysis,
          sectors: existingAnalysis.sectors,
          marketSentiment: this.validateMarketSentiment(existingAnalysis.marketSentiment),
          tickers: state.tickers || []
        };
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

      // Process response and create analysis result
      let analysisContent: string;
      try {
        if (response instanceof BaseMessage) {
          analysisContent = response.content?.toString() || '';
        } else if (typeof response === 'object' && response !== null) {
          analysisContent = JSON.stringify(response);
        } else {
          analysisContent = String(response || '');
        }

        state.analysis = analysisContent;

        try {
          const parsedAnalysis = JSON.parse(analysisContent) as StructuredLLMResponse;

          // Validate market sentiment before storing
          parsedAnalysis.marketSentiment = this.validateMarketSentiment(parsedAnalysis.marketSentiment);

          state.structuredAnalysis = parsedAnalysis;

          // Create analysis result and connect existing stock snapshots
          let stockSnapshots = [];
          if (state.stockInfoMap) {
            stockSnapshots = await Promise.all(
              Object.values(state.stockInfoMap).map(stockInfo =>
                this.prisma.stockDataSnapshot.findFirst({
                  where: {
                    ticker: stockInfo.ticker,
                    snapshotTime: new Date(stockInfo.time)
                  }
                })
              )
            );
          }

          // Store analysis result without assigning to unused variable
          await this.prisma.newsAnalysisResult.create({
            data: {
              query: state.query,
              isDefaultQuery: state.isDefaultQuery || false,
              analysis: parsedAnalysis.analysis,
              marketSentiment: parsedAnalysis.marketSentiment,
              sectors: parsedAnalysis.sectors,
              articles: {
                connect: await this.findOrCreateArticles(state.articles)
              },
              stockData: {
                connect: stockSnapshots
                  .filter(snapshot => snapshot !== null)
                  .map(snapshot => ({ id: snapshot.id }))
              }
            }
          });

          // Update state with validated sentiment
          if (parsedAnalysis.tickers) state.tickers = parsedAnalysis.tickers;
          if (parsedAnalysis.marketSentiment) state.sentiment = parsedAnalysis.marketSentiment;
          if (parsedAnalysis.sectors) state.sectors = parsedAnalysis.sectors;

        } catch (parseError) {
          this.logger.warn('Failed to parse structured analysis - falling back to regex extraction:', {
            error: parseError.message,
            rawContent: analysisContent.substring(0, 100) + '...'
          });

          // Store unstructured analysis without assigning to unused variable
          await this.prisma.newsAnalysisResult.create({
            data: {
              query: state.query,
              isDefaultQuery: state.isDefaultQuery || false,
              analysis: analysisContent,
              articles: {
                connect: await this.findOrCreateArticles(state.articles)
              }
            }
          });

          // Fallback to regex extraction for tickers
          const tickerMatch = analysisContent.match(/\b[A-Z]{1,5}\b/g);
          if (tickerMatch) {
            state.tickers = [...new Set(tickerMatch)];
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
        this.logger.error('Error processing LLM response:', parseError);
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

  private async findRecentAnalysis(state: NewsAnalysisState) {
    // Look for analysis from last hour with same query
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    return this.prisma.newsAnalysisResult.findFirst({
      where: {
        query: state.query,
        isDefaultQuery: state.isDefaultQuery || false,
        createdAt: {
          gte: oneHourAgo
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  private async findOrCreateArticles(articles: NewsArticle[]) {
    if (!articles) return [];

    return Promise.all(articles.map(async article => {
      const existing = await this.prisma.newsArticle.findFirst({
        where: { url: article.url }
      });

      if (existing) {
        return { id: existing.id };
      }

      type EnrichedArticle = NewsArticle & { relevancyScore?: number };
      const articleWithScore = article as EnrichedArticle;

      const created = await this.prisma.newsArticle.create({
        data: {
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: new Date(article.publishedAt),
          source: new URL(article.url).hostname,
          relevancyScore: articleWithScore.relevancyScore
        }
      });

      return { id: created.id };
    }));
  }
}
