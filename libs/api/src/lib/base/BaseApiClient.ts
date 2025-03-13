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

    // Bind the HTTP methods to this instance
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    this.patch = this.patch.bind(this);

    console.log('[BaseApiClient] Created with config:', axiosConfig);
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log('[BaseApiClient] Making request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
          headers: config.headers
        });
        return config;
      },
      (error) => {
        console.error('[BaseApiClient] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log('[BaseApiClient] Received response:', {
          status: response.status,
          url: response.config.url,
          data: response.data
        });
        return response.data;
      },
      (error) => {
        console.error('[BaseApiClient] Response error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data
        });

        if (error.response) {
          throw new ApiError(
            error.response?.status,
            error.response?.data?.message || 'An unexpected error occurred',
            error.response?.data
          );
        }
        throw new ApiError(500, 'Network Error');
      }
    );
  }

  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    console.log('[BaseApiClient] Making GET request to:', path);
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
