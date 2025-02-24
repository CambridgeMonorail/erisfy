import { useState, useEffect, useCallback } from 'react';
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

  const client = clientFactory();

  const fetchNews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const getNews = 'getLatestMarketInsight' in client && client.getLatestMarketInsight
        ? client.getLatestMarketInsight
        : client.getLatestNews;

      if (!getNews) {
        throw new Error('No valid news fetching method available');
      }

      const { data } = await getNews();
      setNews(data);
    } catch (err) {
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
    try {
      setIsUpdating(true);
      await fetchNews();
    } finally {
      setIsUpdating(false);
    }
  }, [fetchNews]);

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
