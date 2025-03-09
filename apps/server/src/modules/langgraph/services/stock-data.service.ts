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
    // Skip if no tickers available
    if (!state.tickers?.length) {
      this.logger.warn('No stock tickers available for lookup');
      return state;
    }

    // Use the first ticker for now - in future we could fetch data for all tickers
    const ticker = state.tickers[0];
    this.logger.log(`Fetching stock data for ticker: ${ticker}`);

    const url = `${this.apiBaseUrl}/financial-metrics/snapshot?ticker=${ticker}`;
    const headers = { 'X-API-KEY': this.apiKey };

    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Financial Datasets API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.snapshot) {
        throw new Error('No snapshot data found in the response');
      }

      const { snapshot } = data;

      state.stockInfo = {
        ticker,
        price: snapshot.market_cap, // Replace with the appropriate field
        change: snapshot.price_to_earnings_ratio, // Replace with the appropriate field
        changePercent: snapshot.price_to_book_ratio, // Replace with the appropriate field
        timestamp: new Date().toISOString(),
      };

      this.logger.log(`Retrieved stock data for ${ticker}`);
    } catch (error) {
      this.logger.error('Error fetching stock data', error);
      state.error = `Failed to fetch stock data: ${error.message}`;
    }

    return state;
  }
}
