import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from '../errors/ApiError';
import { ApiConfig, ApiResponse } from '../types/api';

export class BaseApiClient {
  protected client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          throw new ApiError(
            error.response.status,
            error.response.data?.message || 'An error occurred',
            error.response.data
          );
        }
        throw new ApiError(500, 'Network Error');
      }
    );
  }

  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(path, config);
    return {
      data: response.data,
      status: response.status,
      message: response.statusText
    };
  }

  protected async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(path, data, config);
    return {
      data: response.data,
      status: response.status,
      message: response.statusText
    };
  }

  protected async patch<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(path, data, config);
    return {
      data: response.data,
      status: response.status,
      message: response.statusText
    };
  }

  protected async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(path, data, config);
    return {
      data: response.data,
      status: response.status,
      message: response.statusText
    };
  }

  protected async delete<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(path, config);
    return {
      data: response.data,
      status: response.status,
      message: response.statusText
    };
  }
}
