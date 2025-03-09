import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState } from '../../langgraph/interfaces/news-analysis-state.interface';

/**
 * Service for retrieving stock data from external APIs
 * Currently integrates with Financial Datasets API
 */
@Injectable()
export class StockDataService {
  private readonly logger = new Logger(StockDataService.name);
  private readonly apiBaseUrl = 'https://api.financialdatasets.ai';
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('FINANCIALDATASETS_API_KEY');

    if (!this.apiKey) {
      this.logger.warn('FINANCIALDATASETS_API_KEY is not defined in environment variables');
    }
  }

  /**
   * Fetches stock data for all tickers in the state
   * If no tickers are provided, attempts to extract one from the analysis
   * @param state The current news analysis state
   * @returns Updated state with stock information
   */
  async fetchStock(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    // Initialize tickers array from state or try to extract from analysis
    let tickers = state.tickers || [];

    if (tickers.length === 0 && state.analysis) {
      const matches = state.analysis.match(/[A-Z]{1,5}/g) || [];
      tickers = matches.filter(match => this.isValidTickerFormat(match));
      if (tickers.length > 0) {
        this.logger.debug(`Extracted tickers from analysis: ${tickers.join(', ')}`);
      }
    }

    // Initialize stockInfoMap
    state.stockInfoMap = {};

    // Handle case when no tickers are available
    if (tickers.length === 0) {
      this.logger.warn('No stock tickers available for lookup');
      const defaultStockInfo = {
        ticker: 'UNKNOWN',
        price: 0,
        dayChange: 0,
        dayChangePercent: 0,
        marketCap: 0,
        time: new Date().toISOString(),
        error: 'No tickers available for lookup'
      };
      state.stockInfoMap['UNKNOWN'] = defaultStockInfo;
      return state;
    }

    // Fetch data for all tickers in parallel
    const stockDataPromises = tickers.map(ticker => this.fetchStockData(ticker));
    const results = await Promise.allSettled(stockDataPromises);

    // Process results and populate stockInfoMap
    results.forEach((result, index) => {
      const ticker = tickers[index];
      if (result.status === 'fulfilled') {
        state.stockInfoMap[ticker] = result.value;
      } else {
        const errorStockInfo = {
          ticker,
          price: 0,
          dayChange: 0,
          dayChangePercent: 0,
          marketCap: 0,
          time: new Date().toISOString(),
          error: 'Financial Datasets API call failed.',
          details: result.reason instanceof Error ? result.reason.message : 'Unknown error'
        };
        state.stockInfoMap[ticker] = errorStockInfo;
      }
    });

    return state;
  }

  /**
   * Fetches stock data for a single ticker from the Financial Datasets API
   * @param ticker The stock ticker symbol
   * @returns Promise of StockInfo
   */
  private async fetchStockData(ticker: string) {
    const url = `${this.apiBaseUrl}/prices/snapshot?ticker=${ticker}`;

    const res = await fetch(url, {
      headers: {
        'X-API-KEY': this.apiKey,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();

    if (!data.snapshot) {
      throw new Error('No snapshot data found in the response');
    }

    const { snapshot } = data;

    return {
      ticker,
      price: snapshot.price || 0,
      dayChange: snapshot.day_change || 0,
      dayChangePercent: snapshot.day_change_percent || 0,
      marketCap: snapshot.market_cap || 0,
      time: snapshot.time || new Date().toISOString(),
    };
  }

  /**
   * Helper method to validate if a string looks like a valid ticker symbol
   * @param ticker Potential ticker symbol
   * @returns Boolean indicating if the string looks like a valid ticker
   */
  private isValidTickerFormat(ticker: string): boolean {
    // Basic validation - tickers are typically 1-5 uppercase letters
    // Could be enhanced with more specific rules based on market requirements
    return /^[A-Z]{1,5}$/.test(ticker);
  }
}
