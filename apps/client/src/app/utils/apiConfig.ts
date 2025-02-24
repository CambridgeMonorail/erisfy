import { ApiConfig } from '@erisfy/api';

export const createApiConfig = (): ApiConfig => ({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4200/erisfy/api/',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? '30000'),
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiConfig: ApiConfig = createApiConfig();
