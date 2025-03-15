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

    console.log('[BaseApiClient] Initializing with config:', {
      baseURL: axiosConfig.baseURL,
      timeout: axiosConfig.timeout
    });

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

    // Response interceptor - only log the response, don't transform it
    this.client.interceptors.response.use(
      (response) => {
        console.log('[BaseApiClient] Received response:', {
          status: response.status,
          url: response.config.url,
          data: response.data
        });
        return response; // Return the full response, not just response.data
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
    try {
      console.log(`[BaseApiClient] Making GET request to: ${path}`);
      const response: AxiosResponse<T> = await this.client.get<T>(path, config);
      console.log(`[BaseApiClient] Response received from ${path}:`, response.data);
      
      // Return proper ApiResponse format
      return { 
        data: response.data,
        status: response.status,
        message: response.statusText
      } as ApiResponse<T>;
    } catch (error) {
      console.error(`[BaseApiClient] Error in GET request to ${path}:`, error);
      throw this.handleError(error);
    }
  }

  protected async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(path, data, config);
      return { 
        data: response.data,
        status: response.status,
        message: response.statusText
      } as ApiResponse<T>;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(path, data, config);
      return { 
        data: response.data,
        status: response.status,
        message: response.statusText
      } as ApiResponse<T>;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async delete<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(path, config);
      return { 
        data: response.data,
        status: response.status,
        message: response.statusText
      } as ApiResponse<T>;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async patch<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(path, data, config);
      return { 
        data: response.data,
        status: response.status,
        message: response.statusText
      } as ApiResponse<T>;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      return new ApiError(
        error.response?.status,
        error.response?.data?.message || 'An unexpected error occurred',
        error.response?.data
      );
    }
    return new ApiError(500, 'Network Error');
  }
}
