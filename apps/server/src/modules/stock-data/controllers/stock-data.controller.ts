import { Controller, Get, Param, Query, Logger, NotFoundException } from '@nestjs/common';
import { StockDataService } from '../services/stock-data.service';
import { NewsAnalysisState } from '../../news-analysis/interfaces/news-analysis-state.interface';

/**
 * Controller for stock data related endpoints
 */
@Controller('stock-data')
export class StockDataController {
  private readonly logger = new Logger(StockDataController.name);

  constructor(private readonly stockDataService: StockDataService) {}

  /**
   * Retrieves stock data for a specific ticker
   * @param ticker Stock ticker symbol
   * @returns Stock data for the specified ticker
   */
  @Get(':ticker')
  async getStockData(@Param('ticker') ticker: string) {
    this.logger.log(`Fetching stock data for ticker: ${ticker}`);

    const state: NewsAnalysisState = {
      query: ticker,
      ticker,
    };

    const result = await this.stockDataService.fetchStock(state);

    if (result.stockInfo && 'error' in result.stockInfo) {
      throw new NotFoundException(`Could not retrieve stock data for ticker: ${ticker}`);
    }

    return result.stockInfo;
  }

  /**
   * Searches for stock data based on a query
   * This endpoint will try to extract a ticker from the query
   * @param query Search query that might contain a ticker
   * @returns Stock data if a ticker was found in the query
   */
  @Get()
  async searchStockData(@Query('query') query: string) {
    this.logger.log(`Searching stock data for query: ${query}`);

    const state: NewsAnalysisState = {
      query,
      analysis: query, // Treating the query as analysis text to extract a ticker
    };

    const result = await this.stockDataService.fetchStock(state);

    if (result.stockInfo && 'error' in result.stockInfo) {
      throw new NotFoundException(`Could not find stock data for query: ${query}`);
    }

    return result.stockInfo;
  }
}
