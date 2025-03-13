import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import { MarketOpportunitiesResponse } from '../types/marketOpportunities';

export class MarketOpportunitiesEndpoint extends BaseApiClient {
  async getOpportunities(): Promise<ApiResponse<MarketOpportunitiesResponse>> {
    return this.get<MarketOpportunitiesResponse>('/market-opportunities');
  }

  async getOpportunitiesByTicker(ticker: string): Promise<ApiResponse<MarketOpportunitiesResponse>> {
    return this.get<MarketOpportunitiesResponse>(`/market-opportunities/${ticker}`);
  }
}
