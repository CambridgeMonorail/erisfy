import { ApiConfig } from '../types/api';
import { getApiBaseUrl } from '../config/environment';
import { MarketSentimentEndpoint } from '../endpoints/MarketSentimentEndpoint';
import { NewsEndpoint } from '../endpoints/NewsEndpoint';

const createDefaultConfig = (): ApiConfig => ({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createMarketSentimentEndpoint = (): MarketSentimentEndpoint => {
  return new MarketSentimentEndpoint(createDefaultConfig());
};

export const createNewsEndpoint = (): NewsEndpoint => {
  return new NewsEndpoint(createDefaultConfig());
};
