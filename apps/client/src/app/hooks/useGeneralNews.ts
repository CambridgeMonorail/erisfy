import { useState, useEffect } from 'react';
import { ApiError, type NewsItem } from '@erisfy/api';
import { newsApi } from '../api/clients';

export function useGeneralNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchGeneralNews = async () => {
      console.log('[useGeneralNews] Starting fetch...');
      try {
        setIsLoading(true);
        console.log('[useGeneralNews] Making API request...');
        const response = await newsApi.getGeneral();
        console.log('[useGeneralNews] Raw API response:', response);

        if (response.data) {
          setNews(response.data);
          console.log('[useGeneralNews] News data set successfully');
        } else {
          console.warn('[useGeneralNews] No news data in response');
          setNews([]);
        }
      } catch (err) {
        console.error('[useGeneralNews] Error fetching news:', err);
        setError(err instanceof ApiError ? err : new ApiError(500, 'Failed to fetch general news'));
      } finally {
        setIsLoading(false);
        console.log('[useGeneralNews] Fetch completed');
      }
    };

    void fetchGeneralNews();
  }, []);

  return {
    news,
    isLoading,
    error
  };
}
