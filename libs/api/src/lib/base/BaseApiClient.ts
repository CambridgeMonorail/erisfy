import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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
    return this.client.get<ApiResponse<T>, AxiosResponse<ApiResponse<T>>>(path, config);
  }

  protected async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.post<ApiResponse<T>, AxiosResponse<ApiResponse<T>>>(path, data, config);
  }

  protected async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.put<ApiResponse<T>, AxiosResponse<ApiResponse<T>>>(path, data, config);
  }

  protected async delete<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.delete<ApiResponse<T>, AxiosResponse<ApiResponse<T>>>(path, config);
  }

  protected async patch<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.patch<ApiResponse<T>, AxiosResponse<ApiResponse<T>>>(path, data, config);
  }
}
