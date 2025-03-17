import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError, MarketData } from '@erisfy/api';
import { marketSentimentApi } from '../api/clients';

// Constants
const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 2000; // 2 seconds

/**
 * Type for market sentiment error
 */
export type MarketSentimentError = ApiError | null;

/**
 * Return type for useMarketSentiment hook for better type safety
 */
export type MarketSentimentResult = {
  marketData: MarketData | null;
  isLoading: boolean;
  error: MarketSentimentError;
  refetch: () => Promise<void>;
  isUpdating?: boolean;
};

/**
 * Hook for fetching market sentiment data from the API
 * @returns Object containing market data, loading state, error state, and refetch function
 */
export function useMarketSentiment(): MarketSentimentResult {
  // Keep all useState calls together at the top
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<MarketSentimentError>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  
  // useRef calls after useState
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);
  const retryTimeoutRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Cleanup function to abort ongoing requests and clear timeouts
   */
  const cleanupOngoingOperations = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  /**
   * Fetches market sentiment data from the API with retry logic
   * @param attempt Current retry attempt number
   */
  const fetchMarketSentiment = useCallback(async (attempt = 1): Promise<void> => {
    if (fetchInProgressRef.current) {
      return;
    }
    fetchInProgressRef.current = true;

    // Clean up any ongoing operations
    cleanupOngoingOperations();
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await marketSentimentApi.getMarketSentiment({
        signal: abortControllerRef.current.signal
      });

      if (!isMountedRef.current) {
        return;
      }

      if (!response?.data) {
        throw new ApiError(500, 'Invalid market sentiment data received');
      }

      setMarketData(response.data);
    } catch (err) {
      // Only process errors if still mounted
      if (!isMountedRef.current) {
        return;
      }

      // Only retry on network errors or 5xx server errors
      const shouldRetry = attempt < MAX_RETRIES && (
        !(err instanceof ApiError) || // Network error
        (err instanceof ApiError && err.status >= 500) // Server error
      );

      if (shouldRetry) {
        // Calculate exponential backoff delay
        const delay = BASE_RETRY_DELAY * Math.pow(2, attempt - 1);
        
        // Set retry timeout
        retryTimeoutRef.current = window.setTimeout(() => {
          if (isMountedRef.current) {
            void fetchMarketSentiment(attempt + 1);
          }
        }, delay);
        
        return;
      }

      // If we're not retrying, set the error
      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market sentiment'));
      setMarketData(null);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      fetchInProgressRef.current = false;
    }
  }, [cleanupOngoingOperations]); // Add cleanupOngoingOperations to dependencies

  // useEffect calls after useCallback
  useEffect(() => {
    isMountedRef.current = true;
    void fetchMarketSentiment();

    return () => {
      isMountedRef.current = false;
      cleanupOngoingOperations();
    };
  }, [fetchMarketSentiment, cleanupOngoingOperations]);

  return {
    marketData,
    isLoading,
    error,
    refetch: fetchMarketSentiment
  };
}
