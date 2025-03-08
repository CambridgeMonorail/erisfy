import { Injectable, Logger } from '@nestjs/common';
import { NewsService } from '../../news/news.service';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { NewsArticle } from '../../openai/interfaces/news-analysis.interface';

// Extending the NewsArticle interface to include our enrichment properties
interface EnrichedNewsArticle extends NewsArticle {
  relevancyScore?: number;
}

@Injectable()
export class NewsFetcherService {
  private readonly logger = new Logger(NewsFetcherService.name);
  private inFlightRequests = new Map<string, Promise<NewsAnalysisState>>();

  constructor(
    private readonly newsService: NewsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async fetchNews(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    if (!state.query) {
      this.logger.warn('No query provided for news lookup');
      return state;
    }

    const cacheKey = `news:${state.query}:${state.ticker || 'noticker'}`;

    // Try cache first
    const cached = await this.cacheManager.get<NewsAnalysisState>(cacheKey);
    if (cached) {
      this.logger.log(`Retrieved news from cache for query: ${state.query}`);
      return cached;
    }

    // Deduplicate in-flight requests
    if (this.inFlightRequests.has(cacheKey)) {
      this.logger.log(`Using existing in-flight request for query: ${state.query}`);
      const request = this.inFlightRequests.get(cacheKey);
      return request ? request : this.performNewsFetch(state, cacheKey);
    }

    // Create new request
    const requestPromise = this.performNewsFetch(state, cacheKey);
    this.inFlightRequests.set(cacheKey, requestPromise);

    try {
      return await requestPromise;
    } finally {
      this.inFlightRequests.delete(cacheKey);
    }
  }

  private async performNewsFetch(state: NewsAnalysisState, cacheKey: string): Promise<NewsAnalysisState> {
    this.logger.log(`Fetching news for query: ${state.query}`);
    const startTime = Date.now();

    try {
      const articles = await this.newsService.queryNews(state.query);

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
        ticker: state.ticker,
        duration: Date.now() - startTime
      });
      state.error = `Failed to fetch news: ${error.message}`;
      return state;
    }
  }

  private isRelevantArticle(article: NewsArticle, state: NewsAnalysisState): boolean {
    // Filter out irrelevant or duplicate articles
    if (!article.title || !article.description) return false;

    // If ticker is provided, prioritize articles mentioning it
    if (state.ticker &&
        !article.title.toUpperCase().includes(state.ticker) &&
        !article.description.toUpperCase().includes(state.ticker)) {
      return false;
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
    if (state.ticker) {
      const tickerMentions = (article.title + article.description)
        .toUpperCase()
        .split(state.ticker)
        .length - 1;
      score += tickerMentions * 0.5;
    }

    // Add more scoring factors as needed
    return Math.min(score, 5); // Cap at 5
  }
}
