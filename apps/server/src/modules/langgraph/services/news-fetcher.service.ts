import { Injectable, Logger } from '@nestjs/common';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { NewsArticle } from '../../openai/interfaces/news-analysis.interface';
import { TavilyService } from '../../tavily/tavily.service';
import { PrismaService } from '../../../prisma.service';

// Extending the NewsArticle interface to include our enrichment properties
interface EnrichedNewsArticle extends NewsArticle {
  relevancyScore?: number;
}

@Injectable()
export class NewsFetcherService {
  private readonly logger = new Logger(NewsFetcherService.name);
  private inFlightRequests = new Map<string, Promise<NewsAnalysisState>>();

  constructor(
    private readonly tavilyService: TavilyService,
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async fetchNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    const effectiveQuery = state.isDefaultQuery ? 'top financial news today' : state.query;

    if (!effectiveQuery) {
      this.logger.error('No query available for news lookup');
      state.error = 'Invalid news query configuration';
      return state;
    }

    const tickersKey = state.tickers?.length ? state.tickers.sort().join(',') : 'notickers';
    const cacheKey = `news:${effectiveQuery}:${tickersKey}`;

    // Try cache first
    const cached = await this.cacheManager.get<NewsAnalysisState>(cacheKey);
    if (cached) {
      this.logger.log(`Retrieved news from cache for query: ${effectiveQuery}`);
      return cached;
    }

    // Check database for recent articles
    const recentArticles = await this.getRecentArticles(effectiveQuery);
    if (recentArticles.length > 0) {
      this.logger.log(`Found ${recentArticles.length} recent articles in database`);
      state.articles = recentArticles;
      return state;
    }

    // Handle in-flight requests
    if (this.inFlightRequests.has(cacheKey)) {
      this.logger.log(`Using existing in-flight request for query: ${effectiveQuery}`);
      const request = this.inFlightRequests.get(cacheKey);
      return request ? request : this.performNewsFetch({ ...state, query: effectiveQuery }, cacheKey);
    }

    const requestPromise = this.performNewsFetch({ ...state, query: effectiveQuery }, cacheKey);
    this.inFlightRequests.set(cacheKey, requestPromise);

    try {
      return await requestPromise;
    } finally {
      this.inFlightRequests.delete(cacheKey);
    }
  }

  private async getRecentArticles(query: string): Promise<NewsArticle[]> {
    // Get articles from last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const articles = await this.prisma.newsArticle.findMany({
      where: {
        publishedAt: {
          gte: oneDayAgo
        },
        // Find articles through their analysis results matching the query
        analysisResults: {
          some: {
            query: query
          }
        }
      },
      include: {
        analysisResults: {
          where: {
            query: query
          },
          take: 1,
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 10 // Limit to 10 most recent articles
    });

    return articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt.toISOString(),
      relevancyScore: article.relevancyScore || undefined,
      // Include analysis data if available
      analysis: article.analysisResults[0]?.analysis,
      marketSentiment: article.analysisResults[0]?.marketSentiment
    }));
  }

  private async createOrUpdateArticle(articleData: any, state: NewsAnalysisState) {
    const { url, ...articleDetails } = articleData;

    // Check for existing article
    let article = await this.prisma.newsArticle.findFirst({
      where: { url }
    });

    if (article) {
      // Update existing article if needed
      if (articleDetails.relevancyScore !== undefined) {
        article = await this.prisma.newsArticle.update({
          where: { id: article.id },
          data: { relevancyScore: articleDetails.relevancyScore }
        });
      }
    } else {
      // Create new article
      article = await this.prisma.newsArticle.create({
        data: {
          url,
          ...articleDetails
        }
      });
    }

    return article;
  }

  private async performNewsFetch(state: NewsAnalysisState, cacheKey: string): Promise<NewsAnalysisState> {
    this.logger.log(`Fetching news for ${state.isDefaultQuery ? 'top financial news' : `query: ${state.query}`}`);
    const startTime = Date.now();

    try {
      const tavilyParams = {
        query: state.query || 'top financial news today',
        search_depth: state.isDefaultQuery ? "basic" : "advanced" as "basic" | "advanced",
        include_answer: false,
        include_raw_content: false,
        include_domains: ["reuters.com", "bloomberg.com", "cnbc.com", "wsj.com", "ft.com", "marketwatch.com", "finance.yahoo.com"],
        exclude_domains: ["www.cnbc.com/finance/"],
        max_results: state.isDefaultQuery ? 10 : 5
      };

      const tavilyResponse = await this.tavilyService.search(tavilyParams);

      // Process and store articles with proper association
      const articles = await Promise.all(tavilyResponse.results.map(async result => {
        const articleData = {
          title: result.title,
          description: result.content,
          url: result.url,
          publishedAt: new Date(result.published_date || Date.now()),
          source: new URL(result.url).hostname
        };

        // Store or update in database
        const storedArticle = await this.createOrUpdateArticle(articleData, state);

        return {
          ...articleData,
          publishedAt: articleData.publishedAt.toISOString()
        };
      }));

      // Filter and enrich articles
      const enrichedArticles = articles
        .filter(article => this.isRelevantArticle(article, state))
        .map(article => this.enrichArticle(article, state));

      state.articles = enrichedArticles;

      const duration = Date.now() - startTime;
      this.logger.log(`Retrieved ${enrichedArticles.length} news articles in ${duration}ms`);

      await this.cacheManager.set(cacheKey, state, 5 * 60 * 1000); // 5 minutes

      return state;
    } catch (error) {
      this.logger.error('Error fetching news', {
        error,
        query: state.query,
        tickers: state.tickers,
        duration: Date.now() - startTime
      });
      state.error = `Failed to fetch news: ${error.message}`;
      return state;
    }
  }

  private isRelevantArticle(article: NewsArticle, state: NewsAnalysisState): boolean {
    if (!article.title || !article.description) return false;

    // For default query (top news), ensure it's a substantial article
    if (state.isDefaultQuery) {
      return article.description.length > 100; // Ensure article has meaningful content
    }

    // For specific queries, prioritize articles mentioning the tickers or query terms
    if (state.tickers && state.tickers.length > 0) {
      const mentionsTicker = state.tickers.some(ticker =>
        article.title.toUpperCase().includes(ticker) ||
        article.description.toUpperCase().includes(ticker)
      );
      if (!mentionsTicker) {
        return false;
      }
    }

    // Add more relevancy checks as needed
    return true;
  }

  private enrichArticle(article: NewsArticle, state: NewsAnalysisState): EnrichedNewsArticle {
    return {
      ...article,
      relevancyScore: this.calculateRelevancyScore(article, state),
      // Add any other enrichment needed
    };
  }

  private calculateRelevancyScore(article: NewsArticle, state: NewsAnalysisState): number {
    let score = 1;

    // Increase score based on ticker mentions
    if (state.tickers && state.tickers.length > 0) {
      state.tickers.forEach(ticker => {
        if (article.title.toUpperCase().includes(ticker)) score += 0.5;
        if (article.description.toUpperCase().includes(ticker)) score += 0.3;
      });
    }

    // Add more scoring factors as needed
    return Math.min(score, 5); // Cap at 5
  }
}
