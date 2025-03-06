import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState } from '../../news-analysis/interfaces/news-analysis-state.interface';

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
   * Fetches stock data for a given ticker and updates the state
   * If no ticker is provided, attempts to extract one from the analysis
   * @param state The current news analysis state
   * @returns Updated state with stock information
   */
  async fetchStock(state: NewsAnalysisState): Promise<NewsAnalysisState> {
    let ticker = state.ticker;

    // Optionally extract ticker from the analysis if not provided
    if (!ticker && state.analysis) {
      const match = state.analysis.match(/[A-Z]{1,5}/);
      if (match) {
        ticker = match[0];
        this.logger.debug(`Extracted ticker ${ticker} from analysis`);
      }
    }

    if (!ticker) {
      this.logger.log('No ticker identified for stock data retrieval');
      state.stockInfo = {
        ticker: 'UNKNOWN',
        error: 'No ticker identified.'
      };
      return state;
    }

    // Use the Financial Datasets API snapshot endpoint
    const url = `${this.apiBaseUrl}/prices/snapshot?ticker=${ticker}`;

    try {
      this.logger.log(`Fetching stock data for ticker: ${ticker}`);

      const res = await fetch(url, {
        headers: {
          'X-API-KEY': this.apiKey,
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${await res.text()}`);
      }

      const stockData = await res.json();
      this.logger.debug(`Successfully retrieved stock data for ${ticker}`);

      state.stockInfo = {
        ...stockData,
        ticker // Ensure ticker is included in successful response
      };
    } catch (err) {
      this.logger.error(`Error fetching stock data for ${ticker} from Financial Datasets API`, err instanceof Error ? err.message : String(err));
      state.stockInfo = {
        error: 'Financial Datasets API call failed.',
        ticker,
        details: err instanceof Error ? err.message : 'Unknown error'
      };
    }

    return state;
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
