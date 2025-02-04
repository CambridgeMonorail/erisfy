import { ApiClient} from './api-client.interface';

import { createAxiosInstance } from './axios-instance';
import { MarketInsightsResponse } from '../types/market.types';
import { ApiResponse } from '../types/api.types';

export type RealAPIClientConfig = {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

export class RealAPIClient<T = unknown> implements ApiClient<T> {
  private client;

  constructor(config: RealAPIClientConfig = {}) {
    this.client = createAxiosInstance({
      baseURL: config.baseURL || process.env.API_BASE_URL || 'http://localhost:3000/api',
      timeout: config.timeout || 10000
      // ...existing config...
    });
  }

  async getResource(id: string): Promise<ApiResponse<T>> {
    const response = await this.client.get(`/resources/${id}`);
    return {
      data: response.data,
      status: response.status
    };
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>> {
    const response = await this.client.get(`/resources`, { params });
    return {
      data: response.data,
      status: response.status,
    };
  }

  async createResource(data: Partial<T>): Promise<ApiResponse<T>> {
    const response = await this.client.post(`/resources`, data);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    const response = await this.client.put(`/resources/${id}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    const response = await this.client.delete(`/resources/${id}`);
    return {
      data: undefined,
      status: response.status,
    };
  }

  async getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>> {
    const response = await this.client.get<MarketInsightsResponse>('/market/insights');
    return {
      data: response.data,
      status: response.status,
    };
  }
}