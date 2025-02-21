import { useState, useEffect, useMemo } from 'react';
import { ApiError, MarketNewsEndpoint, MarketNewsRecord } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

export const useMarketNews = () => {
  const [news, setNews] = useState<MarketNewsRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const marketNewsClient = useMemo(
    () => new MarketNewsEndpoint(createApiConfig()),
    []
  );

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await marketNewsClient.getLatestNews();
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
  };

  const triggerUpdate = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      await marketNewsClient.triggerNewsUpdate();
      // Fetch the latest news after triggering update
      await fetchNews();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    triggerUpdate,
    refetch: fetchNews
  };
};
