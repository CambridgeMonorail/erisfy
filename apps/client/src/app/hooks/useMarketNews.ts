import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError, MarketInsightsEndpoint, NewsEndpoint, MarketDataInsights, NewsArticle } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

type NewsData = MarketDataInsights | NewsArticle[];
type NewsClient<T> = {
  getLatestMarketInsight?: () => Promise<{ data: T }>;
  getLatestNews?: () => Promise<{ data: T }>;
};

const useNewsData = <T extends NewsData>(
  clientFactory: () => NewsClient<T>
) => {
  const [news, setNews] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const client = useRef(clientFactory()).current;

  const fetchNews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let response;
      if ('getLatestMarketInsight' in client && client.getLatestMarketInsight) {
        response = await client.getLatestMarketInsight();
      } else if (client.getLatestNews) {
        response = await client.getLatestNews();
      }

      if (!response) {
        throw new Error('No valid news fetching method available');
      }

      setNews(response.data);
    } catch (err) {
      console.error('Error fetching news:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  const triggerUpdate = useCallback(async () => {
    if (isUpdating) return; // Prevent multiple simultaneous updates
    try {
      setIsUpdating(true);
      await fetchNews();
    } finally {
      setIsUpdating(false);
    }
  }, [fetchNews, isUpdating]);

  useEffect(() => {
    void fetchNews();
  }, [fetchNews]);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    triggerUpdate,
  };
};

export const useMarketNews = () => {
  return useNewsData<MarketDataInsights>(() =>
    new MarketInsightsEndpoint(createApiConfig())
  );
};

export const useGeneralNews = () => {
  return useNewsData<NewsArticle[]>(() =>
    new NewsEndpoint(createApiConfig())
  );
};
