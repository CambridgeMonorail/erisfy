import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { StructuredLLMResponse, StockInfo } from '../../openai/interfaces/news-analysis.interface';
import { LLMAnalyzerService } from './llm-analyzer.service';
import { ArticleManagerService } from './article-manager.service';
import { TickerExtractorService } from './ticker-extractor.service';
import { MarketSentimentResponseDto } from '../dto/market-sentiment-response.dto';
import { SentimentType } from '@erisfy/api';

interface PrismaAnalysisResult {
  id: string;
  analysis: string;
  query: string;
  sectors: string[];
  isDefaultQuery: boolean;
  marketSentiment: string;
  createdAt: Date;
  updatedAt: Date;
  stockData: Array<{ ticker: string }>;
}

interface StoredAnalysis {
  id: string;
  analysis: string;
  sectors: string[];
  marketSentiment: string;
  tickers: string[];
  stockData: Array<{ ticker: string }>;
}

interface StockSnapshot {
  ticker: string;
  price: number;
  dayChange: number;
  dayChangePercent: number;
  marketCap: number;
  snapshotTime: Date;
}

@Injectable()
export class NewsAnalyserService {
  private readonly logger = new Logger(NewsAnalyserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly llmAnalyzer: LLMAnalyzerService,
    private readonly articleManager: ArticleManagerService,
    private readonly tickerExtractor: TickerExtractorService
  ) {}

  async analyseNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      if (!state.articles?.length) {
        this.logger.warn('No articles provided for analysis');
        return {
          ...state,
          analysis: "No news articles found for analysis.",
          error: "No articles provided",
          stockInfo: null
        };
      }

      // Check cache if not bypassed
      if (!state.bypassCache) {
        const cachedResult = await this.findRecentAnalysis(state);
        if (cachedResult) {
          return this.processExistingAnalysis(state, cachedResult);
        }
      }

      // Log incoming state
      this.logIncomingState(state);

      // Format articles for analysis
      const formattedContent = this.articleManager.formatArticlesForPrompt(state.articles);

      // Get analysis from LLM
      const analysis = await this.llmAnalyzer.analyzeNewsContent(
        formattedContent,
        state.isDefaultQuery || false
      );

      // Process and store analysis
      return this.processAndStoreAnalysis(state, analysis);

    } catch (error) {
      this.logger.error('Error analyzing news:', error);
      return {
        ...state,
        error: `Failed to analyze news: ${error.message}`,
        stockInfo: null
      };
    }
  }

  private async findRecentAnalysis(state: NewsAnalysisState) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    try {
      const analysis = await this.prisma.newsAnalysisResult.findFirst({
        where: {
          query: state.query,
          isDefaultQuery: state.isDefaultQuery || false,
          createdAt: { gte: oneHourAgo }
        },
        orderBy: { createdAt: 'desc' },
        include: {
          stockData: {
            select: { ticker: true }
          }
        }
      }) as PrismaAnalysisResult | null;

      if (analysis) {
        // Transform PrismaAnalysisResult to StoredAnalysis
        const tickers = analysis.stockData.map(s => s.ticker);
        return {
          id: analysis.id,
          analysis: analysis.analysis,
          sectors: analysis.sectors,
          marketSentiment: analysis.marketSentiment,
          tickers,
          stockData: analysis.stockData
        };
      }

      return null;
    } catch (error) {
      this.logger.error('Error retrieving recent analysis', error);
      return null;
    }
  }

  private async processExistingAnalysis(state: NewsAnalysisState, existingAnalysis: StoredAnalysis) {
    this.logger.log('Found recent analysis in database');

    // Extract any additional tickers from the articles' content
    const extractedTickers = this.tickerExtractor.extractTickersFromArticles(state.articles);

    // Combine existing and newly extracted tickers
    const allTickers = Array.from(new Set([
      ...existingAnalysis.tickers,
      ...extractedTickers
    ]));

    const stockSnapshots = await this.getStockSnapshots(existingAnalysis.id);
    const stockInfoMap = this.processStockSnapshots(stockSnapshots);

    return {
      ...state,
      analysis: existingAnalysis.analysis,
      structuredAnalysis: {
        analysis: existingAnalysis.analysis,
        sectors: existingAnalysis.sectors || [],
        marketSentiment: this.llmAnalyzer.validateMarketSentiment(existingAnalysis.marketSentiment),
        tickers: allTickers
      },
      sectors: existingAnalysis.sectors || [],
      sentiment: this.llmAnalyzer.validateMarketSentiment(existingAnalysis.marketSentiment),
      tickers: allTickers,
      stockInfoMap,
      stockInfo: Object.values(stockInfoMap)[0] || null
    };
  }

  private async processAndStoreAnalysis(
    state: NewsAnalysisState,
    analysis: StructuredLLMResponse
  ): Promise<NewsAnalysisState> {
    // Handle missing tickers with fallback extraction
    if (!analysis.tickers?.length) {
      const extractedTickers = this.tickerExtractor.extractTickersFromArticles(state.articles);
      if (extractedTickers.length > 0) {
        analysis.tickers = extractedTickers;
      }
    }

    // Store analysis in database
    await this.storeAnalysisResult(state, analysis);

    // Return updated state
    return {
      ...state,
      analysis: analysis.analysis,
      structuredAnalysis: analysis,
      sectors: analysis.sectors || [],
      sentiment: analysis.marketSentiment,
      tickers: analysis.tickers || [],
      stockInfo: state.stockInfo || null
    };
  }

  private async storeAnalysisResult(state: NewsAnalysisState, analysis: StructuredLLMResponse) {
    try {
      const articleIds = await this.articleManager.findOrCreateArticles(state.articles);
      const tickers = analysis.tickers || [];

      // Create stock snapshots for each ticker if we have market data
      const stockSnapshots = [];
      for (const ticker of tickers) {
        const stockInfo = state.stockInfoMap?.[ticker];
        if (stockInfo) {
          const snapshot = await this.prisma.stockDataSnapshot.create({
            data: {
              ticker: stockInfo.ticker,
              price: stockInfo.price,
              dayChange: stockInfo.dayChange,
              dayChangePercent: stockInfo.dayChangePercent,
              marketCap: stockInfo.marketCap,
              snapshotTime: new Date(stockInfo.time)
            }
          });
          stockSnapshots.push({ id: snapshot.id });
        }
      }

      // Create the analysis result with all relationships
      await this.prisma.newsAnalysisResult.create({
        data: {
          query: state.query || '',
          isDefaultQuery: state.isDefaultQuery || false,
          analysis: analysis.analysis,
          marketSentiment: analysis.marketSentiment,
          sectors: analysis.sectors || [],
          articles: {
            connect: articleIds
          },
          stockData: {
            connect: stockSnapshots
          }
        }
      });

      this.logger.debug('Stored analysis result with relationships', {
        articleCount: articleIds.length,
        stockSnapshotCount: stockSnapshots.length,
        tickerCount: tickers.length
      });
    } catch (error) {
      this.logger.error('Failed to store analysis result:', error);
      throw error;
    }
  }

  private async getStockSnapshots(analysisId: string) {
    return this.prisma.stockDataSnapshot.findMany({
      where: {
        analysisResults: {
          some: { id: analysisId }
        }
      }
    });
  }

  private processStockSnapshots(snapshots: StockSnapshot[]): Record<string, StockInfo> {
    return snapshots.reduce((acc: Record<string, StockInfo>, snapshot) => {
      acc[snapshot.ticker] = {
        ticker: snapshot.ticker,
        price: snapshot.price,
        dayChange: snapshot.dayChange,
        dayChangePercent: snapshot.dayChangePercent,
        marketCap: snapshot.marketCap,
        time: snapshot.snapshotTime.toISOString()
      };
      return acc;
    }, {});
  }

  private async getStockSnapshotIds(stockInfoMap: Record<string, StockInfo>) {
    const snapshots = await Promise.all(
      Object.values(stockInfoMap).map(info =>
        this.prisma.stockDataSnapshot.findFirst({
          where: {
            ticker: info.ticker,
            snapshotTime: new Date(info.time)
          },
          select: { id: true }
        })
      )
    );

    return snapshots
      .filter((snapshot): snapshot is { id: string } =>
        snapshot !== null && typeof snapshot.id === 'string'
      )
      .map(snapshot => ({ id: snapshot.id }));
  }

  private logIncomingState(state: NewsAnalysisState) {
    this.logger.log(`Starting analysis of ${state.articles.length} news articles`);
    this.logger.debug('Incoming state:', {
      articleCount: state.articles.length,
      query: state.query,
      tickers: state.tickers,
      isDefaultQuery: state.isDefaultQuery
    });
  }

  private transformToMarketSentimentResponse(state: NewsAnalysisState): MarketSentimentResponseDto {
    if (!state.structuredAnalysis) {
      this.logger.warn('No structured analysis available for market sentiment response');
    }

    // Create a default stock info if missing
    const defaultStockInfo = {
      ticker: 'N/A',
      price: 0,
      dayChange: 0,
      dayChangePercent: 0,
      marketCap: 0,
      time: new Date().toISOString(),
    };

    const mapSentiment = (sentiment: string | undefined): SentimentType => {
      switch (sentiment?.toLowerCase()) {
        case 'positive':
          return 'bullish';
        case 'negative':
          return 'bearish';
        default:
          return 'neutral';
      }
    };

    // Ensure we have valid tickers from all possible sources
    const tickers = Array.from(new Set([
      ...(state.tickers || []),
      ...(state.structuredAnalysis?.tickers || []),
      ...Object.keys(state.stockInfoMap || {})
    ])).filter(ticker => ticker && ticker !== 'N/A');

    // Create stock info map from available stock data
    const stockInfoMap: Record<string, StockInfo> = state.stockInfoMap ? { ...state.stockInfoMap } : {};

    // Add placeholder entries for any tickers without stock info
    tickers.forEach(ticker => {
      if (!stockInfoMap[ticker]) {
        stockInfoMap[ticker] = {
          ticker,
          price: 0,
          dayChange: 0,
          dayChangePercent: 0,
          marketCap: 0,
          time: new Date().toISOString()
        };
      }
    });

    const response: MarketSentimentResponseDto = {
      structuredAnalysis: {
        analysis: state.structuredAnalysis?.analysis || state.analysis || 'No analysis available',
        sectors: state.structuredAnalysis?.sectors || state.sectors || [],
        marketSentiment: mapSentiment(state.structuredAnalysis?.marketSentiment || state.sentiment),
        tickers: tickers
      },
      sentiment: mapSentiment(state.structuredAnalysis?.marketSentiment || state.sentiment),
      stockInfoMap,
      stockInfo: Object.values(stockInfoMap)[0] || defaultStockInfo
    };

    this.logger.debug('Transformed market sentiment response:', {
      tickerCount: tickers.length,
      stockInfoMapSize: Object.keys(stockInfoMap).length,
      sentiment: response.sentiment
    });

    return response;
  }
}
