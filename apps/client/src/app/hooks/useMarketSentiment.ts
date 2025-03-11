import { useState, useEffect } from 'react';
import { MarketData, ApiError } from '@erisfy/api';
import { marketSentimentApi } from '../api/clients';

export function useMarketSentiment() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const fetchMarketSentiment = async () => {
    console.log('[useMarketSentiment] Starting fetch...');
    try {
      setIsLoading(true);
      console.log('[useMarketSentiment] Making API request...');
      const response = await marketSentimentApi.getMarketSentiment();
      console.log('[useMarketSentiment] Received response:', response);
      setMarketData(response.data);
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
