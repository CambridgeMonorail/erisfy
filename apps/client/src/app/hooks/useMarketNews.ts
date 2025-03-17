import { useState, useCallback, useEffect, useRef } from 'react';
import { ApiError, MarketStory, MarketSector } from '@erisfy/api';
import { marketInsightsApi } from '../api/clients';
import { Story } from '@erisfy/shadcnui-blocks';

// Constants
const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 2000; // 2 seconds

/**
 * Response type from the market news API
 */
type MarketNewsResponse = {
  stories: MarketStory[];
};

/**
 * Hook return type for better type safety
 */
type UseMarketNewsReturn = {
  news: Story[];
  isLoading: boolean;
  error: ApiError | null;
  isUpdating: boolean;
  refetch: () => Promise<void>;
  triggerUpdate: () => Promise<void>;
};

/**
 * Hook for fetching and managing market news data
 * 
 * @returns Object containing news data, loading states, error state, and functions to update or refresh data
 */
export function useMarketNews(): UseMarketNewsReturn {
  // State declarations grouped together
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [news, setNews] = useState<Story[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Refs
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  /**
   * Converts MarketStory data from API to Story format for UI components
   */
  const mapMarketStoryToStory = useCallback((story: MarketStory): Story => ({
    title: story.title,
    one_line_summary: story.one_line_summary,
    whats_happening: story.whats_happening,
    market_impact: story.market_impact,
    market_sector: story.market_sector as MarketSector
  }), []);

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
   * Fetches latest market news data from API with retry logic
   */
  const fetchNews = useCallback(async (attempt = 1): Promise<void> => {
    // Prevent concurrent fetches
    if (fetchInProgressRef.current) return;
    fetchInProgressRef.current = true;
    
    // Clean up any ongoing operations
    cleanupOngoingOperations();
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    try {
      if (attempt === 1) {
        setIsLoading(true);
      }
      
      console.log('[useMarketNews] Fetching latest market news...');
      const response = await marketInsightsApi.getLatestMarketInsight<MarketNewsResponse>({
        signal: abortControllerRef.current.signal
      });

      // Check if component is still mounted
      if (!isMountedRef.current) return;

      if (response.data) {
        const stories: Story[] = response.data.stories.map(mapMarketStoryToStory);
        setNews(stories);
        setError(null);
      } else {
        throw new ApiError(500, 'Invalid market news data received');
      }
    } catch (err) {
      // Ignore aborted requests
      if (err && (err as Error).name === 'AbortError') {
        return;
      }
      
      // Only process errors if still mounted
      if (!isMountedRef.current) return;
      
      console.error('[useMarketNews] Error fetching market news:', err);
      
      // Only retry on network errors or 5xx server errors
      const shouldRetry = attempt < MAX_RETRIES && (
        !(err instanceof ApiError) || // Network error
        (err instanceof ApiError && err.status >= 500) // Server error
      );

      if (shouldRetry) {
        const retryDelay = BASE_RETRY_DELAY * Math.pow(2, attempt - 1);
        console.log(`[useMarketNews] Retrying in ${retryDelay}ms (attempt ${attempt}/${MAX_RETRIES})`);
        
        retryTimeoutRef.current = window.setTimeout(() => {
          fetchInProgressRef.current = false;
          void fetchNews(attempt + 1);
        }, retryDelay);
        return;
      }
      
      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market news'));
    } finally {
      if (isMountedRef.current && attempt === 1) {
        setIsLoading(false);
      }
      fetchInProgressRef.current = false;
    }
  }, [mapMarketStoryToStory, cleanupOngoingOperations]);

  /**
   * Triggers an update of market news by requesting new data generation
   * and then fetching the updated news
   */
  const triggerUpdate = useCallback(async (): Promise<void> => {
    try {
      setIsUpdating(true);
      await marketInsightsApi.getMarketInsights();
      await fetchNews();
    } catch (err) {
      console.error('[useMarketNews] Error triggering update:', err);
      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to trigger news update'));
    } finally {
      setIsUpdating(false);
    }
  }, [fetchNews]);

  // Initial fetch on mount and cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    void fetchNews(1);
    
    return () => {
      isMountedRef.current = false;
      cleanupOngoingOperations();
    };
  }, [fetchNews, cleanupOngoingOperations]);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    refetch: () => fetchNews(1),
    triggerUpdate
  };
}


