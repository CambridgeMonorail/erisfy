import { ApiConfig } from "@erisfy/api";


const API_CONFIG: ApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  }
};

const baseClient = new BaseApiClient(API_CONFIG);

export const usersApi = new UsersEndpoint(baseClient);
