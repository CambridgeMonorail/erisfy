import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError, MarketData } from '@erisfy/api';
import { marketSentimentApi } from '../api/clients';

/**
 * Hook for fetching market sentiment data from the API
 * @returns Market sentiment data, loading state, error, and refetch function
 */
export function useMarketSentiment() {
  // Keep all useState calls together at the top
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | undefined>();
  const [marketData, setMarketData] = useState<MarketData | undefined>();
  
  // useRef calls after useState
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);

  const fetchMarketSentiment = useCallback(async () => {
    if (fetchInProgressRef.current) {
      return;
    }
    fetchInProgressRef.current = true;

    try {
      setIsLoading(true);
      setError(undefined);
      
      const response = await marketSentimentApi.getMarketSentiment();

      if (!isMountedRef.current) {
        return;
      }

      if (!response?.data) {
        throw new ApiError(500, 'Invalid market sentiment data received');
      }

      setMarketData(response.data);
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }

      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market sentiment'));
      setMarketData(undefined);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      fetchInProgressRef.current = false;
    }
  }, []); // Safe to use empty array since we use refs to track state

  // useEffect calls after useCallback
  useEffect(() => {
    isMountedRef.current = true;
    void fetchMarketSentiment();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchMarketSentiment]);

  return {
    marketData,
    isLoading,
    error,
    refetch: fetchMarketSentiment
  };
}
