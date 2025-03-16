import { useState, useCallback, useEffect, useRef } from 'react';
import { ApiError, MarketDataInsights, MarketInsightsEndpoint, getApiBaseUrl } from '@erisfy/api';

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 2000; // 2 seconds

/**
 * Error type for market insight data fetching
 */
export type MarketInsightError = ApiError | null;

/**
 * Result type returned by useLatestMarketInsight hook
 */
export type MarketInsightResult = {
  data: MarketDataInsights | null;
  isLoading: boolean;
  error: MarketInsightError;
  refetch: () => Promise<void>;
  reset: () => void;
};

/**
 * Hook for fetching the latest market insights data
 * @returns Object containing data, loading state, error, refetch and reset functions
 */
export function useLatestMarketInsight(): MarketInsightResult {
  const [data, setData] = useState<MarketDataInsights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<MarketInsightError>(null);
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch function moved outside of useEffect to be accessible by refetch and reset
  const fetchLatestInsight = useCallback(async (attempt = 1): Promise<void> => {
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

      // Check response format
      if (!response?.data) {
        throw new ApiError(500, 'Invalid market insights data received');
      }

      // Set the data from response.data
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
        const retryDelay = BASE_RETRY_DELAY * Math.pow(2, attempt - 1); // Exponential backoff
        
        // Clear any existing timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        
        retryTimeoutRef.current = setTimeout(() => {
          fetchInProgressRef.current = false;
          void fetchLatestInsight(attempt + 1);
          retryTimeoutRef.current = null;
        }, retryDelay);
        return;
      }

      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market insights'));
      setData(null);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        fetchInProgressRef.current = false;
      }
    }
  }, []);

  // Initial fetch on mount and cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    void fetchLatestInsight(1);

    return () => {
      isMountedRef.current = false;
      
      // Clear any pending retry timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [fetchLatestInsight]);

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(true);
    setError(null);
    
    // Clear any existing timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    void fetchLatestInsight(1);
  }, [fetchLatestInsight]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchLatestInsight,
    reset,
  };
}
