// We expose these API clients for backward compatibility, but new code should
// use the endpoint instances directly from @erisfy/api
import { MarketSentimentEndpoint, NewsEndpoint, MarketInsightsEndpoint, getApiBaseUrl } from '@erisfy/api';

const config = {
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const marketSentimentApi = new MarketSentimentEndpoint(config);
export const newsApi = new NewsEndpoint(config);
export const marketInsightsApi = new MarketInsightsEndpoint(config);
