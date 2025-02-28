import { useState, useEffect, useMemo } from 'react';
import { ApiError, NewsEndpoint, NewsArticle } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

export const useGeneralNews = () => {
  const [news, setNews] = useState<NewsArticle[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const newsClient = useMemo(
    () => new NewsEndpoint(createApiConfig()),
    []
  );

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await newsClient.getLatestNews();
      setNews(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpdate = async () => {
    try {
      setIsUpdating(true);
      await fetchNews();
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    void fetchNews();
  }, []);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    triggerUpdate,
  };
};
