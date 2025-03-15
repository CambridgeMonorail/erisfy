import { useState, useCallback, useEffect, useRef } from 'react';
import { ApiError, MarketDataInsights, MarketInsightsEndpoint, getApiBaseUrl } from '@erisfy/api';

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 2000; // 2 seconds

/**
 * Hook for fetching the latest market insights data
 */
export function useLatestMarketInsight() {
  const [data, setData] = useState<MarketDataInsights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);

  const fetchOpportunities = useCallback(async (attempt = 1): Promise<void> => {
    // Prevent concurrent fetches
    if (fetchInProgressRef.current) return;
    fetchInProgressRef.current = true;

    try {
      setIsLoading(true);
      setError(null);

      const client = new MarketInsightsEndpoint({
        baseURL: getApiBaseUrl(),
        timeout: 30000, // Increased timeout to 30s
      });

      const response = await client.getLatestMarketInsight();

      // Check if component is still mounted
      if (!isMountedRef.current) return;

      if (!response?.data) {
        throw new ApiError(500, 'Invalid market insights data received');
      }

      setData(response.data);
      setError(null);
    } catch (err) {
      // Only process errors if still mounted
      if (!isMountedRef.current) return;

      // Only retry on network errors or 5xx server errors
      const shouldRetry = attempt < MAX_RETRIES && (
        !(err instanceof ApiError) || // Network error
        (err instanceof ApiError && err.status >= 500) // Server error
      );

      if (shouldRetry) {
        const retryDelay = BASE_RETRY_DELAY * attempt;
        setTimeout(() => {
          fetchInProgressRef.current = false;
          void fetchOpportunities(attempt + 1);
        }, retryDelay);
        return;
      }

      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market opportunities'));
      setData(null);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      fetchInProgressRef.current = false;
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(true);
    setError(null);
    void fetchOpportunities(1);
  }, [fetchOpportunities]);

  // Initial fetch on mount and cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    void fetchOpportunities(1);

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchOpportunities]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchOpportunities,
    reset,
  };
}
