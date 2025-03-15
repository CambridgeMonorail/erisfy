import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import { MarketData } from '../types/marketSentiment';

export class MarketSentimentEndpoint extends BaseApiClient {
  async getMarketSentiment(): Promise<ApiResponse<MarketData>> {
    return this.get<MarketData>('/news-analysis/market-sentiment');
  }
}
