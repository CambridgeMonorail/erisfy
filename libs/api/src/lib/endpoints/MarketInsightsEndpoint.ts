import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import {
  MarketDataInsights,
  MarketDataInsightsFilter,
  CreateMarketDataInsightsDto,
  UpdateMarketDataInsightsDto
} from '../types/marketInsights';
import { ApiError } from '../errors/ApiError';

export class MarketInsightsEndpoint extends BaseApiClient {
  constructor(config: ConstructorParameters<typeof BaseApiClient>[0]) {
    super(config);
    this.getLatestMarketInsight = this.getLatestMarketInsight.bind(this);
    console.log('[MarketInsightsEndpoint] Initialized with config:', {
      baseURL: config.baseURL,
      timeout: config.timeout
    });
  }

  async getMarketInsights(filter?: MarketDataInsightsFilter): Promise<ApiResponse<MarketDataInsights[]>> {
    return this.get<MarketDataInsights[]>('/market-insights', { params: filter });
  }

  async getMarketInsightByDate(date: string): Promise<ApiResponse<MarketDataInsights>> {
    return this.get<MarketDataInsights>(`/market-insights/${date}`);
  }

  async createMarketInsight(data: CreateMarketDataInsightsDto): Promise<ApiResponse<MarketDataInsights>> {
    return this.post<MarketDataInsights>('/market-insights', data);
  }

  async updateMarketInsight(date: string, data: UpdateMarketDataInsightsDto): Promise<ApiResponse<MarketDataInsights>> {
    return this.patch<MarketDataInsights>(`/market-insights/${date}`, data);
  }

  async replaceMarketInsight(date: string, data: CreateMarketDataInsightsDto): Promise<ApiResponse<MarketDataInsights>> {
    return this.put<MarketDataInsights>(`/market-insights/${date}`, data);
  }

  async deleteMarketInsight(date: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/market-insights/${date}`);
  }

  async getLatestMarketInsight(): Promise<ApiResponse<MarketDataInsights>> {
    console.log('[MarketInsightsEndpoint] Calling getLatestMarketInsight');
    try {
      const response = await this.get<MarketDataInsights>('/market-insights/latest');
      console.log('[MarketInsightsEndpoint] Raw response:', response);

      // If response is already in ApiResponse format, return it
      if (response && typeof response === 'object' && 'data' in response && response.data) {
        return response as ApiResponse<MarketDataInsights>;
      }

      // If response is the direct data (has required MarketDataInsights properties)
      if (
        response &&
        typeof response === 'object' &&
        'date' in response &&
        typeof response.date === 'string' &&
        'stories' in response &&
        Array.isArray(response.stories)
      ) {
        const marketDataInsights: MarketDataInsights = {
          date: response.date,
          stories: response.stories
        };

        return {
          data: marketDataInsights,
          status: 200,
          message: 'Latest market insight retrieved successfully'
        };
      }

      // If response is invalid
      throw new ApiError(500, 'Invalid response format from market insights endpoint');
    } catch (error) {
      console.error('[MarketInsightsEndpoint] Error fetching latest market insight:', error);

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        500,
        `Failed to fetch market insights: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
