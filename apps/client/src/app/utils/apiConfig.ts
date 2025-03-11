import { ApiConfig } from '@erisfy/api';
import axios from 'axios';

interface WindowWithEnv extends Window {
  __env?: Record<string, string>;
}

const getEnvVar = (key: string, fallback: string): string => {
  // Check process.env first
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }

  // Check window.__env with proper type safety
  if (typeof window !== 'undefined') {
    const customWindow = window as WindowWithEnv;
    const envValue = customWindow.__env?.[key];
    if (envValue !== undefined) {
      return envValue;
    }
  }

  // Check Vite-specific environment variables
  if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
    return import.meta.env[key] ?? fallback;
  }

  return fallback;
};

export const createApiConfig = (): ApiConfig => {
  const baseURL = getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001/api');
  const timeout = Number(getEnvVar('VITE_API_TIMEOUT', '30000'));

  // Add axios interceptors for debugging
  axios.interceptors.request.use(request => {
    console.log('Request:', request.method?.toUpperCase(), request.url);
    return request;
  });

  axios.interceptors.response.use(
    response => {
      console.log('Response:', response.status, response.config.url);
      return response;
    },
    error => {
      console.error('Response Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data
      });
      return Promise.reject(error);
    }
  );

  return {
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export const apiConfig: ApiConfig = createApiConfig();
