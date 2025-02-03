import { ApiClient, ApiResponse, ApiErrorCode } from './api-client.interface';
import { ApiError } from './errors/ApiError';
import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios';

export type RealAPIClientConfig = {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

export class RealAPIClient<T = unknown> implements ApiClient<T> {
  private client: AxiosInstance;
  
  constructor(config: RealAPIClientConfig = {}) {
    const axiosConfig: CreateAxiosDefaults = {
      baseURL: config.baseURL || process.env.API_BASE_URL || 'http://localhost:3000/api',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    };

    try {
      this.client = axios.create(axiosConfig);
      this.setupInterceptors();
    } catch (error) {
      throw new Error('Failed to initialize API client: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new ApiError(error.message, {
          code: error.code || 'UNKNOWN_ERROR',
          status: error.response?.status,
          details: error.response?.data
        });
      }
    );
  }

  private async withRetry<R>(operation: () => Promise<R>, retries = 3): Promise<R> {
    let attempts = 0;
    
    while (attempts < retries) {
      try {
        attempts++;
        return await operation();
      } catch (error) {
        if (attempts === retries || !this.isRetryableError(error)) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error('Maximum retry attempts reached');
  }

  private isRetryableError(error: unknown): boolean {
    return error instanceof AxiosError && 
           [408, 429, 500, 502, 503, 504].includes(error.response?.status ?? 0);
  }

  async getResource(id: string): Promise<ApiResponse<T>> {
    return this.withRetry(async () => {
      const response = await this.client.get(`/resources/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>> {
    return this.withRetry(async () => {
      const response = await this.client.get(`/resources`, { params });
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async createResource(data: Partial<T>): Promise<ApiResponse<T>> {
    return this.withRetry(async () => {
      const response = await this.client.post(`/resources`, data);
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.withRetry(async () => {
      const response = await this.client.put(`/resources/${id}`, data);
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    return this.withRetry(async () => {
      const response = await this.client.delete(`/resources/${id}`);
      return {
        data: undefined,
        status: response.status,
      };
    });
  }

  async getMarketInsights(): Promise<ApiResponse<unknown>> {
    return this.withRetry(async () => {
      const response = await this.client.get('/market/insights');
      return {
        data: response.data,
        status: response.status,
      };
    });
  }
}