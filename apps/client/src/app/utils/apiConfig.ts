import { ApiConfig } from "@erisfy/api";

export const createApiConfig = (): ApiConfig => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200/erisfy/api/';
  const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

  console.log('API Config:', { baseURL, timeout });

  return {
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
