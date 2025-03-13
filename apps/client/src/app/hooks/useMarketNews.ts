import { useState, useEffect } from 'react';
import { NewsItem, ApiError } from '@erisfy/api';
import { marketInsightsApi } from '../api/clients';

export function useMarketNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      console.log('[useMarketNews] Fetching latest market insights...');
      const response = await marketInsightsApi.getLatestMarketInsight();

      if (response.data) {
        // Transform market stories into NewsItem format and generate unique ids
        const newsItems: NewsItem[] = response.data.stories.map((story, index) => ({
          id: `${response.data.date}-${index}`, // Generate unique id using date and index
          title: story.title,
          summary: story.one_line_summary,
          relevance: [story.market_sector],
          publishedAt: response.data.date
        }));
        setNews(newsItems);
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


