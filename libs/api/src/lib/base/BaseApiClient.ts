import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from '../errors/ApiError';
import { ApiConfig, ApiResponse } from '../types/api';

export abstract class BaseApiClient {
  protected readonly client: AxiosInstance;

  constructor(config: ApiConfig | AxiosRequestConfig) {
    const axiosConfig: AxiosRequestConfig = 'baseURL' in config ? {
      baseURL: config.baseURL,
      timeout: (config as ApiConfig).timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(config as ApiConfig).headers,
      },
    } : config;

    this.client = axios.create(axiosConfig);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          throw new ApiError(
            error.response?.data?.message || 'An unexpected error occurred',
            error.response?.status,
            error.response?.data
          );
        }
        throw new ApiError('Network Error', 500);
      }
    );
  }

  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(path, config);
    return response as ApiResponse<T>;
  }

  protected async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(path, data, config);
    return response as ApiResponse<T>;
  }

  protected async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(path, data, config);
    return response as ApiResponse<T>;
  }

  protected async delete<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(path, config);
    return response as ApiResponse<T>;
  }

  protected async patch<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(path, data, config);
    return response as ApiResponse<T>;
  }
}
