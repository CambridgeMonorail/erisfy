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
        return {
          ...state,
          analysis: "No news articles found for analysis.",
          error: "No articles provided"
        };
      }

      // Check for existing recent analysis
      if (!state.bypassCache) {
        const existingAnalysis = await this.findRecentAnalysis(state);
        if (existingAnalysis) {
          this.logger.log('Found recent analysis in database');

          // Get associated stock data snapshots
          const stockSnapshots = await this.prisma.stockDataSnapshot.findMany({
            where: {
              analysisResults: {
                some: { id: existingAnalysis.id }
              }
            }
          });

          // Process stock snapshots into required format
          const stockInfoMap = stockSnapshots.reduce((acc, snapshot) => {
            acc[snapshot.ticker] = {
              ticker: snapshot.ticker,
              price: snapshot.price,
              dayChange: snapshot.dayChange,
              dayChangePercent: snapshot.dayChangePercent,
              marketCap: snapshot.marketCap,
              time: snapshot.snapshotTime.toISOString()
            };
            return acc;
          }, {} as Record<string, {
            ticker: string;
            price: number;
            dayChange: number;
            dayChangePercent: number;
            marketCap: number;
            time: string;
          }>);

          // Return structured response
          return {
            ...state,
            analysis: existingAnalysis.analysis,
            structuredAnalysis: {
              analysis: existingAnalysis.analysis,
              sectors: existingAnalysis.sectors || [],
              marketSentiment: this.validateMarketSentiment(existingAnalysis.marketSentiment),
              tickers: existingAnalysis.tickers || []
            },
            sectors: existingAnalysis.sectors || [],
            sentiment: this.validateMarketSentiment(existingAnalysis.marketSentiment),
            tickers: existingAnalysis.tickers || [],
            stockInfoMap,
            stockInfo: Object.values(stockInfoMap)[0] || null
          };
        }
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
        "tickers": ["<list of notable company mentions or stock tickers, pay special attention to finding ALL stock symbols like AAPL, MSFT, TSLA in the articles>"]
      }

      Example output:
      {
        "analysis": "The S&P 500 experienced a decline due to tariff concerns and market uncertainty.",
        "sectors": ["Financials", "Technology"],
        "marketSentiment": "negative",
        "tickers": ["SPY", "AAPL", "MSFT", "TSLA"]
      }

      Focus on the most impactful stories and their broader market implications.
      IMPORTANT: Always extract ALL stock ticker symbols mentioned in the articles. Stock tickers are uppercase letters like AAPL, MSFT, TSLA, NVDA, etc.
      Return only the JSON object without any additional text.`
          : `You are a financial analyst assistant. Analyse the provided news articles and provide a response as a JSON object with the following keys:
      {
        "analysis": "<A concise explanation of the key themes or events being discussed>",
        "sectors": ["<list of impacted market sectors or industries>"],
        "marketSentiment": "<one of: positive, negative, neutral>",
        "tickers": ["<list of specific company names or stock tickers mentioned, be thorough in extracting ALL stock ticker symbols like AAPL, MSFT, TSLA>"]
      }

      Example output:
      {
        "analysis": "Market uncertainty remains as trade tensions affect tech and financial sectors.",
        "sectors": ["Technology", "Financials"],
        "marketSentiment": "negative",
        "tickers": ["GOOG", "MSFT", "AAPL", "NVDA"]
      }

      Be concise but thorough in your analysis.
      IMPORTANT: Make sure to extract ALL stock ticker symbols (uppercase letters like AAPL, MSFT) mentioned in the articles.
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

          // Store the structured analysis in state
          state.structuredAnalysis = parsedAnalysis;

          // Update state tickers with those from parsed analysis, ensuring sync between the two
          if (parsedAnalysis.tickers && parsedAnalysis.tickers.length > 0) {
            state.tickers = parsedAnalysis.tickers;
          } else if (state.tickers && state.tickers.length > 0) {
            // If structuredAnalysis doesn't have tickers but state does, synchronize them
            parsedAnalysis.tickers = state.tickers;
            state.structuredAnalysis = parsedAnalysis;
          }

          // Log the LLM response analysis for debugging
          this.logger.debug('LLM response analysis:', {
            hasStructuredAnalysis: !!parsedAnalysis,
            structuredAnalysisKeys: parsedAnalysis ? Object.keys(parsedAnalysis) : [],
            tickersFromLLM: parsedAnalysis?.tickers,
            tickersInState: state.tickers
          });

          // Create analysis result and connect existing stock snapshots
          let stockSnapshots = [];
          if (state.stockInfoMap) {
            stockSnapshots = await Promise.all(
              Object.values(state.stockInfoMap).map(stockInfo =>
                this.prisma.stockDataSnapshot.findFirst({
                  where: {
                    ticker: stockInfo.ticker,
                    snapshotTime: new Date(stockInfo.time)
                  },
                  select: {
                    id: true
                  }
                })
              )
            );
          }

          // Store analysis result with filtered snapshots
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
                  .filter((snapshot): snapshot is { id: string } => snapshot !== null && typeof snapshot.id === 'string')
                  .map(snapshot => ({ id: snapshot.id }))
              }
            }
          });

          // Update state with validated sentiment and sectors
          if (parsedAnalysis.marketSentiment) state.sentiment = parsedAnalysis.marketSentiment;
          if (parsedAnalysis.sectors) state.sectors = parsedAnalysis.sectors;

          // Add fallback ticker extraction if structuredAnalysis.tickers is empty
          if (!state.tickers?.length || (state.structuredAnalysis && (!state.structuredAnalysis.tickers || state.structuredAnalysis.tickers.length === 0))) {
            this.logger.debug('No tickers found in structuredAnalysis, attempting fallback extraction');

            // Extract potential tickers from the analysis text and article content
            const extractedTickers = this.extractTickersFromText(
              state.analysis + ' ' + state.articles.map(a => a.title + ' ' + a.description).join(' ')
            );

            if (extractedTickers.length > 0) {
              this.logger.debug(`Fallback extraction found ${extractedTickers.length} tickers: ${extractedTickers.join(', ')}`);
              if (state.structuredAnalysis) {
                state.structuredAnalysis.tickers = extractedTickers;
              }
              // Also update state.tickers for API compatibility
              state.tickers = extractedTickers;
            }
          }

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

        this.logger.debug('Final state after news analysis:', {
          structuredAnalysisTickers: state.structuredAnalysis?.tickers,
          stateTickers: state.tickers
        });

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

      // When storing new analysis, ensure consistent structure
      const structuredResponse = JSON.parse(analysisContent) as StructuredLLMResponse;
      const validatedSentiment = this.validateMarketSentiment(structuredResponse.marketSentiment);

      // Store analysis result with consistent structure
      await this.prisma.newsAnalysisResult.create({
        data: {
          query: state.query || '',
          isDefaultQuery: state.isDefaultQuery || false,
          analysis: structuredResponse.analysis,
          marketSentiment: validatedSentiment,
          sectors: structuredResponse.sectors || [],
          articles: {
            connect: await this.findOrCreateArticles(state.articles)
          },
          stockData: state.stockInfoMap ? {
            connect: (await Promise.all(
              Object.values(state.stockInfoMap).map(info =>
                this.prisma.stockDataSnapshot.findFirst({
                  where: {
                    ticker: info.ticker,
                    snapshotTime: new Date(info.time)
                  },
                  select: {
                    id: true
                  }
                })
              )
            )).filter((snapshot): snapshot is { id: string } => snapshot !== null && typeof snapshot.id === 'string')
            .map(snapshot => ({ id: snapshot.id }))
          } : undefined
        }
      });

      // Return consistent state structure
      return {
        ...state,
        analysis: structuredResponse.analysis,
        structuredAnalysis: {
          analysis: structuredResponse.analysis,
          sectors: structuredResponse.sectors || [],
          marketSentiment: validatedSentiment,
          tickers: structuredResponse.tickers || []
        },
        sectors: structuredResponse.sectors || [],
        sentiment: validatedSentiment,
        tickers: structuredResponse.tickers || []
      };

    } catch (error) {
      this.logger.error('Error analyzing news:', error);
      return {
        ...state,
        error: `Failed to analyze news: ${error.message}`
      };
    }
  }

  private async findRecentAnalysis(state: NewsAnalysisState) {
    // Look for analysis from last hour with same query
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    try {
      const analysis = await this.prisma.newsAnalysisResult.findFirst({
        where: {
          query: state.query,
          isDefaultQuery: state.isDefaultQuery || false,
          createdAt: {
            gte: oneHourAgo
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          stockData: {
            select: {
              ticker: true
            }
          }
        }
      });

      if (analysis) {
        // Add tickers property from stock data
        const tickers = analysis.stockData.map(s => s.ticker);
        const result = {
          ...analysis,
          tickers
        };

        // Remove the stockData to avoid type issues
        delete result.stockData;

        return result;
      }

      return null;
    } catch (error) {
      this.logger.error('Error retrieving recent analysis', error);
      return null;
    }
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

  private extractTickersFromText(text: string): string[] {
    if (!text) return [];

    // Match stock ticker pattern: 1-5 uppercase letters not part of a larger word
    const matches = text.match(/\b[A-Z]{1,5}\b/g) || [];

    // Filter out common English words and abbreviations that might match the pattern
    const commonWords = new Set(['I', 'A', 'AN', 'THE', 'IN', 'ON', 'AT', 'TO', 'FOR', 'OF', 'CEO', 'CFO', 'COO', 'CTO', 'USA', 'UK', 'EU']);
    const tickers = matches.filter(match => !commonWords.has(match));

    this.logger.debug(`Extracted ${tickers.length} potential tickers from text`, { tickers });
    return tickers;
  }
}
