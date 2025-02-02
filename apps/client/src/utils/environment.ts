/**
 * Check if mock API should be used based on environment configuration
 */
export const shouldUseMocks = (): boolean => {
  return import.meta.env.VITE_REACT_APP_USE_MOCKS === 'true';
};

export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_REACT_APP_MY_API_BASE_URL;
};

export const getApiKey = (): string => {
  return import.meta.env.VITE_REACT_APP_MY_API_KEY;
};
