import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import { MarketNewsRecord, TriggerUpdateResponse } from '../types/marketNews';

export class MarketNewsEndpoint extends BaseApiClient {
  async getLatestNews(): Promise<ApiResponse<MarketNewsRecord>> {
    return this.get<MarketNewsRecord>('/market-news');
  }

  async triggerNewsUpdate(): Promise<ApiResponse<TriggerUpdateResponse>> {
    return this.get<TriggerUpdateResponse>('/market-news/trigger');
  }
}
