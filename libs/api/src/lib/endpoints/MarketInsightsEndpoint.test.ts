import { MarketInsightsEndpoint } from './MarketInsightsEndpoint';
import { createApiConfig } from '../../utils/apiConfig';
import { ApiResponse } from '../types/api';


describe('MarketInsightsEndpoint', () => {
  let marketInsightsEndpoint: MarketInsightsEndpoint;

  beforeAll(() => {
    marketInsightsEndpoint = new MarketInsightsEndpoint(createApiConfig());
  });

  it('should fetch market insights', async () => {
    const response: ApiResponse<MarketDataInsights> = await marketInsightsEndpoint.getMarketInsights();
    expect(response.data).toBeDefined();
    expect(response.status).toBe(200);
  });

  it('should fetch market insight by date', async () => {
    const date = '2025-02-03';
    const response: ApiResponse<MarketDataInsights> = await marketInsightsEndpoint.getMarketInsightByDate(date);
    expect(response.data).toBeDefined();
    expect(response.data.date).toBe(date);
    expect(response.status).toBe(200);
  });
});
