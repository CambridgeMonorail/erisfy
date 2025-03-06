import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState, StockInfo } from '../interfaces/news-analysis-state.interface';

@Injectable()
export class StockDataService {
  private readonly logger = new Logger(StockDataService.name);
  private readonly finnhubKey: string;

  constructor(private readonly configService: ConfigService) {
    this.finnhubKey = this.configService.getOrThrow<string>('FINNHUB_API_KEY');
  }

  async fetchStock(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    try {
      if (!state.ticker) {
        this.logger.warn('No stock ticker available for lookup');
        return state;
      }

      this.logger.log(`Fetching stock data for ticker: ${state.ticker}`);

      const url = `https://finnhub.io/api/v1/quote?symbol=${state.ticker}&token=${this.finnhubKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Finnhub API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Map Finnhub response to our StockInfo interface
      state.stockInfo = {
        ticker: state.ticker,
        price: data.c, // Current price
        change: data.d, // Price change
        changePercent: data.dp, // Percent change
        timestamp: new Date().toISOString()
      };

      this.logger.log(`Retrieved stock data for ${state.ticker}`);
      return state;

    } catch (error) {
      this.logger.error('Error fetching stock data', error);
      state.error = `Failed to fetch stock data: ${error.message}`;
      return state;
    }
  }
}
