import { Injectable, Logger } from '@nestjs/common';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { NewsArticle } from '../../openai/interfaces/news-analysis.interface';
import { TavilyService } from '../../tavily/tavily.service';

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
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async fetchNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    // For default query (no specific query provided), use a predefined query
    const effectiveQuery = state.isDefaultQuery ? 'top financial news today' : state.query;

    // Validate query after considering default case
    if (!effectiveQuery) {
      this.logger.error('No query available for news lookup');
      state.error = 'Invalid news query configuration';
      return state;
    }

    // Create cache key from query and tickers if present
    const tickersKey = state.tickers?.length ? state.tickers.sort().join(',') : 'notickers';
    const cacheKey = `news:${effectiveQuery}:${tickersKey}`;

    // Try cache first
    const cached = await this.cacheManager.get<NewsAnalysisState>(cacheKey);
    if (cached) {
      this.logger.log(`Retrieved news from cache for query: ${effectiveQuery}`);
      return cached;
    }

    // Deduplicate in-flight requests
    if (this.inFlightRequests.has(cacheKey)) {
      this.logger.log(`Using existing in-flight request for query: ${effectiveQuery}`);
      const request = this.inFlightRequests.get(cacheKey);
      return request ? request : this.performNewsFetch({ ...state, query: effectiveQuery }, cacheKey);
    }

    // Create new request
    const requestPromise = this.performNewsFetch({ ...state, query: effectiveQuery }, cacheKey);
    this.inFlightRequests.set(cacheKey, requestPromise);

    try {
      return await requestPromise;
    } finally {
      this.inFlightRequests.delete(cacheKey);
    }
  }

  private async performNewsFetch(state: NewsAnalysisState, cacheKey: string): Promise<NewsAnalysisState> {
    this.logger.log(`Fetching news for ${state.isDefaultQuery ? 'top financial news' : `query: ${state.query}`}`);
    const startTime = Date.now();

    try {
      // Adjust Tavily search parameters based on whether it's default or specific query
      const tavilyParams = {
        query: state.query || 'top financial news today',
        search_depth: state.isDefaultQuery ? "basic" : "advanced" as "basic" | "advanced",
        include_answer: false,
        include_raw_content: false,
        include_domains: ["reuters.com", "bloomberg.com", "cnbc.com", "wsj.com", "ft.com", "marketwatch.com", "finance.yahoo.com"],
        max_results: state.isDefaultQuery ? 10 : 5 // More results for top news, fewer for specific queries
      };

      const tavilyResponse = await this.tavilyService.search(tavilyParams);

      // Convert Tavily results to NewsArticle format
      const articles = tavilyResponse.results.map(result => ({
        title: result.title,
        description: result.content,
        url: result.url,
        publishedAt: result.published_date || new Date().toISOString()
      }));

      // Filter and enrich articles
      const enrichedArticles = articles
        .filter(article => this.isRelevantArticle(article, state))
        .map(article => this.enrichArticle(article, state));

      state.articles = enrichedArticles;

      const duration = Date.now() - startTime;
      this.logger.log(`Retrieved ${enrichedArticles.length} news articles in ${duration}ms`);

      // Cache successful results
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
