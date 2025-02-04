
import { ApiResponse } from '../types/api.types';
import { MarketInsightsResponse } from '../types/market.types';
import { BaseApiClient } from './base-api-client';
import { DEFAULT_MARKET_INSIGHTS, DEFAULT_MOCK_RESOURCES } from './constants/mockData';

export class MockAPIClient<T = unknown> extends BaseApiClient<T> {
  private mockData: Record<string, T>;

  constructor(config = {}, initialData = {}) {
    super(config);
    this.mockData = initialData;
  }

  private async simulateNetwork(): Promise<void> {
    if (this.config.delay) {
      await new Promise(resolve => setTimeout(resolve, this.config.delay));
    }
  }

  private generateId(): string {
    return this.config.testMode ? 'test-id' : `mock-${Date.now()}`;
  }

  async getResource(id: string): Promise<ApiResponse<T>> {
    return this.handleResponse(async () => {
      this.validateId(id);
      await this.simulateNetwork();
      return {
        data: { id, symbol: `MOCK-${id}`, price: 120 } as T,
        status: 200,
      };
    });
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>> {
    return this.handleResponse(async () => {
      await this.simulateNetwork();
      return {
        data: DEFAULT_MOCK_RESOURCES as T[],
        status: 200,
        ...(params && { params })
      };
    });
  }

  async createResource(data: Partial<T>): Promise<ApiResponse<T>> {
    return this.handleResponse(async () => {
      await this.simulateNetwork();
      if (!data) throw this.createError('INVALID_DATA', 'Resource data is required');

      return {
        data: { ...data, id: this.generateId(), mock: true } as T,
        status: 201,
      };
    });
  }

  async updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.handleResponse(async () => {
      this.validateId(id);
      await this.simulateNetwork();

      return {
        data: { ...data, id, mock: true } as T,
        status: 200,
      };
    });
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    return this.handleResponse(async () => {
      this.validateId(id);
      await this.simulateNetwork();

      return {
        data: void 0,
        status: 204,
      };
    });
  }

  async getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>> {
    return this.handleResponse(async () => {
      await this.simulateNetwork();
      return {
        data: {
          ...DEFAULT_MARKET_INSIGHTS,
          lastUpdated: new Date().toISOString()
        },
        status: 200,
      };
    });
  }
}
