import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';

@Injectable()
export class StockDataService {
  private readonly logger = new Logger(StockDataService.name);
  private readonly apiKey: string;
  private readonly apiBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>('FINANCIAL_DATASETS_API_KEY');
    this.apiBaseUrl = this.configService.getOrThrow<string>('FINANCIAL_DATASETS_API_BASE_URL');
  }

  async fetchStock(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    if (!state.tickers?.length) {
      this.logger.warn('No stock tickers available for lookup');
      state.stockInfo = {
        ticker: 'UNKNOWN',
        price: 0,
        dayChange: 0,
        dayChangePercent: 0,
        marketCap: 0,
        time: new Date().toISOString(),
        error: 'No tickers available for lookup'
      };
      return state;
    }

    try {
      const stockDataPromises = state.tickers.map(ticker => this.fetchStockData(ticker));
      const stockResults = await Promise.allSettled(stockDataPromises);

      // Initialize stockInfoMap if it doesn't exist
      state.stockInfoMap = {};

      // Process results and populate stockInfoMap
      stockResults.forEach((result, index) => {
        const ticker = state.tickers[index];
        if (result.status === 'fulfilled') {
          state.stockInfoMap[ticker] = result.value;
          // Set the first successful result as the primary stockInfo for backward compatibility
          if (!state.stockInfo) {
            state.stockInfo = result.value;
          }
        } else {
          this.logger.error(`Failed to fetch data for ${ticker}:`, result.reason);
          const errorStockInfo = {
            ticker,
            price: 0,
            dayChange: 0,
            dayChangePercent: 0,
            marketCap: 0,
            time: new Date().toISOString(),
            error: result.reason.message
          };
          state.stockInfoMap[ticker] = errorStockInfo;
          // If this is the first ticker and we don't have stockInfo set yet, use this as fallback
          if (!state.stockInfo) {
            state.stockInfo = errorStockInfo;
          }
        }
      });

    } catch (error) {
      this.logger.error('Error fetching stock data', error);
      state.error = `Failed to fetch stock data: ${error.message}`;
      state.stockInfo = {
        ticker: state.tickers[0] || 'UNKNOWN',
        price: 0,
        dayChange: 0,
        dayChangePercent: 0,
        marketCap: 0,
        time: new Date().toISOString(),
        error: error.message
      };
    }

    return state;
  }

  private async fetchStockData(ticker: string) {
    const url = `${this.apiBaseUrl}/prices/snapshot?ticker=${ticker}`;
    const headers = { 'X-API-KEY': this.apiKey };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Financial Datasets API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.snapshot) {
      throw new Error('No snapshot data found in the response');
    }

    const { snapshot } = data;

    return {
      ticker,
      price: snapshot.price,
      dayChange: snapshot.day_change,
      dayChangePercent: snapshot.day_change_percent,
      marketCap: snapshot.market_cap,
      time: snapshot.time,
    };
  }
}
