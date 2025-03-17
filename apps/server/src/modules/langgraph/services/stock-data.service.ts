import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewsAnalysisState } from '../interfaces/news-analysis-state.interface';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class StockDataService {
  private readonly logger = new Logger(StockDataService.name);
  private readonly apiKey: string;
  private readonly apiBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
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
      // Initialize stockInfoMap if it doesn't exist
      state.stockInfoMap = {};

      // Process each ticker
      await Promise.all(state.tickers.map(async ticker => {
        // Try to get recent data from database first
        const recentSnapshot = await this.getRecentStockSnapshot(ticker);

        if (recentSnapshot) {
          this.logger.log(`Using recent stock data for ${ticker} from database`);
          const stockInfo = {
            ticker: recentSnapshot.ticker,
            price: recentSnapshot.price,
            dayChange: recentSnapshot.dayChange,
            dayChangePercent: recentSnapshot.dayChangePercent,
            marketCap: recentSnapshot.marketCap,
            time: recentSnapshot.snapshotTime.toISOString()
          };
          state.stockInfoMap[ticker] = stockInfo;
          // Set first result as primary stockInfo for backward compatibility
          if (!state.stockInfo) {
            state.stockInfo = stockInfo;
          }
          return;
        }

        // If no recent data, fetch from API
        try {
          const newStockData = await this.fetchStockData(ticker);
          state.stockInfoMap[ticker] = newStockData;
          if (!state.stockInfo) {
            state.stockInfo = newStockData;
          }

          // Store the new data in database
          await this.storeStockSnapshot(newStockData);
        } catch (error) {
          this.logger.error(`Failed to fetch data for ${ticker}:`, error);
          const errorStockInfo = {
            ticker,
            price: 0,
            dayChange: 0,
            dayChangePercent: 0,
            marketCap: 0,
            time: new Date().toISOString(),
            error: error.message
          };
          state.stockInfoMap[ticker] = errorStockInfo;
          if (!state.stockInfo) {
            state.stockInfo = errorStockInfo;
          }
        }
      }));

    } catch (error) {
      this.logger.error('Error processing stock data', error);
      state.error = `Failed to process stock data: ${error.message}`;
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

  private async getRecentStockSnapshot(ticker: string) {
    // Look for data from last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    return this.prisma.stockDataSnapshot.findFirst({
      where: {
        ticker: ticker,
        snapshotTime: {
          gte: fifteenMinutesAgo
        }
      },
      orderBy: {
        snapshotTime: 'desc'
      }
    });
  }

  private async storeStockSnapshot(stockData: any) {
    return this.prisma.stockDataSnapshot.create({
      data: {
        ticker: stockData.ticker,
        price: stockData.price,
        dayChange: stockData.dayChange,
        dayChangePercent: stockData.dayChangePercent,
        marketCap: stockData.marketCap,
        snapshotTime: new Date(stockData.time)
      }
    });
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
