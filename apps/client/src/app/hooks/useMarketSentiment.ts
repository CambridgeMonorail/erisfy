import { useState, useEffect } from 'react';
import { ApiError } from '@erisfy/api';
import { marketSentimentApi } from '../api/clients';
import type { MarketData } from '../components/MarketSentimentNewsFeed';

export function useMarketSentiment() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const fetchMarketSentiment = async () => {
    try {
      setIsLoading(true);
      const response = await marketSentimentApi.getMarketSentiment();

      if (response.data) {
        setMarketData(response.data);
      }
      setError(null);
    } catch (err) {
      console.error('[useMarketSentiment] Error fetching market sentiment:', err);
      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market sentiment'));
      setMarketData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketSentiment();
  }, []);

  return {
    marketData,
    isLoading,
    error,
    refetch: fetchMarketSentiment
  };
}
