import { useState, useCallback, useEffect } from 'react';
import { ApiError, MarketDataInsights, MarketInsightsEndpoint, getApiBaseUrl } from '@erisfy/api';

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 2000; // 2 seconds

/**
 * Hook for fetching market opportunities data from the latest market insights
 */
export function useMarketOpportunities() {
  const [data, setData] = useState<MarketDataInsights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchOpportunities = useCallback(async (attempt = 1): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('[useMarketOpportunities] Creating client with base URL:', getApiBaseUrl());
      const client = new MarketInsightsEndpoint({
        baseURL: getApiBaseUrl(),
        timeout: 30000, // Increased timeout to 30s
      });

      console.log(`[useMarketOpportunities] Attempt ${attempt} of ${MAX_RETRIES}`);
      const response = await client.getLatestMarketInsight();
      console.log('[useMarketOpportunities] Raw response:', response);

      if (!response?.data) {
        throw new ApiError(500, 'Invalid market insights data received');
      }

      console.log('[useMarketOpportunities] Setting data:', response.data);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error(`[useMarketOpportunities] Attempt ${attempt} failed:`, err);

      // Only retry on network errors or 5xx server errors
      const shouldRetry = attempt < MAX_RETRIES && (
        !(err instanceof ApiError) || // Network error
        (err instanceof ApiError && err.status >= 500) // Server error
      );

      if (shouldRetry) {
        const retryDelay = BASE_RETRY_DELAY * attempt;
        console.log(`[useMarketOpportunities] Retrying in ${retryDelay}ms...`);
        setTimeout(() => {
          void fetchOpportunities(attempt + 1);
        }, retryDelay);
        return;
      }

      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market opportunities'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    console.log('[useMarketOpportunities] Resetting state and fetching fresh data');
    setData(null);
    setIsLoading(true);
    setError(null);
    void fetchOpportunities(1);
  }, [fetchOpportunities]);

  // Add initial fetch on mount
  useEffect(() => {
    console.log('[useMarketOpportunities] Initiating initial fetch');
    void fetchOpportunities(1);
  }, [fetchOpportunities]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchOpportunities,
    reset,
  };
}
