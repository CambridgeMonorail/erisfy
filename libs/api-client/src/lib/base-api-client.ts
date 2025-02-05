import { ApiConfig, ApiResponse } from '../types/api.types';
import { ApiError } from './errors/ApiError';
import { AxiosInstance } from 'axios';
import { MarketInsightsResponse } from '../types/market.types';
import { Onboarding } from '@erisfy/data-access-indexeddb';

export abstract class BaseApiClient<T = unknown> {
  protected config: Required<ApiConfig>;
  protected client?: AxiosInstance;

  constructor(config: ApiConfig = {}, axiosClient?: AxiosInstance) {
    this.config = {
      delay: 200,
      timeout: 10000,
      retries: 3,
      baseURL: '',
      apiKey: '',
      testMode: false,
      ...config
    };
    this.client = axiosClient;
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
  abstract getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>>;

  // Add abstract onboarding methods
  abstract setOnboardingData(onboarding: Omit<Onboarding, 'id'>): Promise<ApiResponse<Onboarding>>;
  abstract getOnboardingData(userId: string): Promise<ApiResponse<Onboarding>>;
  abstract hasViewedOnboarding(userId: string): Promise<ApiResponse<boolean>>;
  abstract deleteOnboardingData(userId: string): Promise<ApiResponse<void>>;
}
