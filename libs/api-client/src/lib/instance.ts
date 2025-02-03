import { RealAPIClient } from './real-api-client';
import { MockAPIClient } from './mock-api-client';

// Use mock client in development, real client in production
const isDevelopment = process.env.NODE_ENV === 'development';

export const apiClient = isDevelopment 
  ? new MockAPIClient({ delay: 200 })
  : new RealAPIClient({
      baseURL: process.env.API_BASE_URL,
      timeout: 10000
    });
