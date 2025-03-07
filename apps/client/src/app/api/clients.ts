import { ApiConfig, UsersEndpoint, NewsEndpoint } from "@erisfy/api";

const API_CONFIG: ApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  }
};

export const usersApi = new UsersEndpoint(API_CONFIG);
export const newsApi = new NewsEndpoint(API_CONFIG);
