import axios, { AxiosInstance } from 'axios';
import { ApiConfig } from './types/api.types';

export const createAxiosInstance = (config: ApiConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Optional: Add a request interceptor to add tokens or other headers.
  instance.interceptors.request.use(
    (config) => {
      // For example, add an authorization header if needed:
      // const token = localStorage.getItem('authToken');
      // if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Optional: Add a response interceptor for centralized error handling.
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // You can handle errors globally here.
      // For example, logging out the user on 401 errors:
      // if (error.response?.status === 401) { ... }
      return Promise.reject(error);
    }
  );

  return instance;
};
