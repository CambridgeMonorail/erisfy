import { useState, useEffect } from 'react';
import { MarketSector, ApiError, MarketStory } from '@erisfy/api';
import { marketInsightsApi } from '../api/clients';
import { Story } from '@erisfy/shadcnui-blocks';

export function useMarketNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [news, setNews] = useState<Story[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      console.log('[useMarketNews] Fetching latest market insights...');
      const response = await marketInsightsApi.getLatestMarketInsight();

      if (response.data) {
        // Directly map MarketStory objects to Story objects expected by NewsStoryCard
        const stories: Story[] = response.data.stories.map((story) => ({
          title: story.title,
          one_line_summary: story.one_line_summary,
          whats_happening: story.whats_happening,
          market_impact: story.market_impact,
          market_sector: story.market_sector as MarketSector
        }));
        setNews(stories);
      }
      setError(null);
    } catch (err) {
      console.error('[useMarketNews] Error fetching market news:', err);
      setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch market news'));
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpdate = async () => {
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
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    triggerUpdate
  };
}


