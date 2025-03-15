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
      console.log('[useLatestMarketInsight] Received API response:', response);
      
      if (!response?.data) {
        console.error('[useLatestMarketInsight] Invalid response - missing data property:', response);
        throw new ApiError(500, 'Invalid market insights data received');
      }

      // Set the data from response.data
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('[useLatestMarketInsight] Error fetching data:', err);
      
      // Only process errors if still mounted
      if (!isMountedRef.current) return;

      // Only retry on network errors or 5xx server errors
      const shouldRetry = attempt < MAX_RETRIES && (
        !(err instanceof ApiError) || // Network error
        (err instanceof ApiError && err.status >= 500) // Server error
      );

      if (shouldRetry) {
        const retryDelay = BASE_RETRY_DELAY * attempt;
        console.log(`[useLatestMarketInsight] Will retry in ${retryDelay}ms`);
        setTimeout(() => {
          fetchInProgressRef.current = false;
          void fetchLatestInsight(attempt + 1);
        }, retryDelay);
        return;
      }

      console.log('[useLatestMarketInsight] Max retries reached or non-retryable error');
      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market opportunities'));
      setData(null);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      fetchInProgressRef.current = false;
    }
  }, []);

  // Log data changes
  useEffect(() => {
    console.log('[useLatestMarketInsight] Data updated:', {
      hasData: !!data,
      storiesCount: data?.stories?.length || 0
    });
    
    if (data?.stories) {
      console.log('[useLatestMarketInsight] First story:', data.stories[0]);
    }
  }, [data]);

  // Initial fetch on mount and cleanup on unmount
  useEffect(() => {
    console.log('[useLatestMarketInsight] Hook mounted, initiating fetch');
    isMountedRef.current = true;
    void fetchLatestInsight(1);

    return () => {
      console.log('[useLatestMarketInsight] Hook unmounting');
      isMountedRef.current = false;
    };
  }, [fetchLatestInsight]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchLatestInsight,
    reset: useCallback(() => {
      setData(null);
      setIsLoading(true);
      setError(null);
      void fetchLatestInsight(1);
    }, [fetchLatestInsight]),
  };
}
