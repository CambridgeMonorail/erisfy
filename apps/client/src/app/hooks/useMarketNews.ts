import { useState, useEffect, useMemo } from 'react';
import { ApiError, MarketInsightsEndpoint, MarketDataInsights } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

export const useMarketNews = () => {
  const [news, setNews] = useState<MarketDataInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const marketNewsClient = useMemo(
    () => new MarketInsightsEndpoint(createApiConfig()),
    []
  );

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await marketNewsClient.getMarketInsights();
      setNews(data[0]); // Get the most recent insights
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

  useEffect(() => {
    void fetchNews();
  }, [fetchNews]);

  return {
    news,
    isLoading,
    error,
    refetch: fetchNews
  };
};
