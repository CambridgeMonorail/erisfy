import { ApiConfig, ApiResponse } from '../types/api.types';
import { ApiError } from './errors/ApiError';
import { AxiosInstance } from 'axios';
import { MarketInsightsResponse } from '../types/market.types';

export abstract class BaseApiClient<T = unknown> {
  protected config: Required<ApiConfig>;

  constructor(config: ApiConfig = {}) {
    this.config = {
      delay: 200,
      timeout: 10000,
      retries: 3,
      baseURL: '',
      apiKey: '',
      testMode: false,
      ...config
    };
  }

  protected validateId(id: string): void {
    if (!id) throw new ApiError('Resource ID is required', { code: 'INVALID_ID' });
  }

  protected validateData(data: unknown): void {
    if (!data) throw new ApiError('Resource data is required', { code: 'INVALID_DATA' });
  }

  protected async handleResponse<R>(
    operation: () => Promise<ApiResponse<R>>
  ): Promise<ApiResponse<R>> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Operation failed', {
        code: 'OPERATION_FAILED',
        details: error
      });
    }
  }

  protected createError(code: string, message: string, status = 400): ApiError {
    return new ApiError(message, {
      code,
      status,
      details: { 
        mock: this.config.testMode, 
        timestamp: new Date().toISOString()
      }
    });
  }

  abstract getResource(id: string): Promise<ApiResponse<T>>;
  abstract listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>>;
  abstract createResource(data: Partial<T>): Promise<ApiResponse<T>>;
  abstract updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>>;
  abstract deleteResource(id: string): Promise<ApiResponse<void>>;
}

export abstract class BaseAPIClient<T = unknown> extends BaseApiClient<T> {
  constructor(protected client: AxiosInstance, config: ApiConfig = {}) {
    super(config);
  }

  async getResource(id: string): Promise<ApiResponse<T>> {
    this.validateId(id);
    return this.handleResponse(() => this.client.get(`/resources/${id}`));
  }

  async getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>> {
    return this.handleResponse(() => this.client.get<MarketInsightsResponse>('/market/insights'));
  }
}
