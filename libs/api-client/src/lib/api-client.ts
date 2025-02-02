import { ApiClient } from './api-client.interface';
import { RealAPIClient } from './real-api-client';
import { MockAPIClient } from './mock-api-client';

/** Determines if the application should use mock API responses */
const shouldUseMocks = (): boolean => {
  const mockEnv = import.meta.env.VITE_REACT_APP_USE_MOCKS;
  if (mockEnv === undefined) {
    console.warn('VITE_REACT_APP_USE_MOCKS environment variable is not set, defaulting to real API');
    return false;
  }
  return mockEnv === 'true';
};

/** Creates and exports the appropriate API client based on environment configuration */
export const apiClient: ApiClient = shouldUseMocks()
  ? new MockAPIClient()
  : new RealAPIClient();
