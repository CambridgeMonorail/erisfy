// We expose these API clients for backward compatibility, but new code should
// use the endpoint instances directly from @erisfy/api
import { 
  MarketSentimentEndpoint, 
  NewsEndpoint, 
  MarketInsightsEndpoint, 
  getApiBaseUrl,
  ApiConfig 
} from '@erisfy/api';

/**
 * Shared API client configuration
 * @remarks
 * This configuration is used to initialize all API clients for backward compatibility
 */
const config: ApiConfig = {
  baseURL: getApiBaseUrl(),
  timeout: 30000, // Consider using an environment variable for this
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * Market sentiment API client instance
 * @deprecated Use direct imports from @erisfy/api instead
 */
export const marketSentimentApi = new MarketSentimentEndpoint(config);

/**
 * News API client instance
 * @deprecated Use direct imports from @erisfy/api instead
 */
export const newsApi = new NewsEndpoint(config);

/**
 * Market insights API client instance
 * @deprecated Use direct imports from @erisfy/api instead
 */
export const marketInsightsApi = new MarketInsightsEndpoint(config);
