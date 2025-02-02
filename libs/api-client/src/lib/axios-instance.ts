import axios, { AxiosInstance, AxiosError } from 'axios';
import axiosRetry from 'axios-retry';

export type APIConfig = {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
};

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RETRIES = 3;

export function createAxiosInstance({
  baseURL,
  apiKey,
  timeout = DEFAULT_TIMEOUT,
  retries = DEFAULT_RETRIES,
}: APIConfig): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout,
  });

  if (apiKey) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  // Configure retry behavior
  axiosRetry(instance, {
    retries,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error: AxiosError) => {
      return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
        (error.response?.status ? error.response.status >= 500 : false);
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const { method, url } = config;
      console.log(`[API Request] ${method?.toUpperCase()} ${url}`);
      return config;
    },
    (error: AxiosError) => {
      console.error('[API Request Error]', {
        message: error.message,
        code: error.code,
        config: error.config,
      });
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      console.error('[API Response Error]', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      return Promise.reject(error);
    }
  );

  return instance;
}
