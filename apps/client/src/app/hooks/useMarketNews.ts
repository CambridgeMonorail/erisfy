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
    console.log('[useNewsData] Starting news fetch...');
    try {
      setIsLoading(true);
      setError(null);

      let response;
      if ('getLatestMarketInsight' in client && client.getLatestMarketInsight) {
        console.log('[useNewsData] Calling getLatestMarketInsight...');
        response = await client.getLatestMarketInsight();
        console.log('[useNewsData] Market insight response:', response);
      } else if (client.getLatestNews) {
        console.log('[useNewsData] Calling getLatestNews...');
        response = await client.getLatestNews();
        console.log('[useNewsData] News response:', response);
      }

      if (!response) {
        throw new Error('No valid news fetching method available');
      }

      // Extract data from the response directly
      const newsData = response.data;
      console.log('[useNewsData] Setting news data:', newsData);
      setNews(newsData);
    } catch (err) {
      console.error('[useNewsData] Error fetching news:', err);
      if (err instanceof ApiError) {
        console.error('[useNewsData] API Error details:', {
          message: err.message,
          status: err.status,
          data: err.data
        });
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
