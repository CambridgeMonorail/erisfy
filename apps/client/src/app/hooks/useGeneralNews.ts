import { useState, useEffect, useCallback } from 'react';
import { ApiError, type NewsItem } from '@erisfy/api';
import { newsApi } from '../api/clients';

export type GeneralNewsError = ApiError | null;

export function useGeneralNews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeneralNewsError>(null);
  const [news, setNews] = useState<NewsItem[]>([]);

  const fetchGeneralNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await newsApi.getGeneral();
      
      if (response.data) {
        setNews(response.data);
      } else {
        setNews([]);
      }
    } catch (err) {
      setError(err instanceof ApiError 
        ? err 
        : new ApiError(500, 'Failed to fetch general news'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await newsApi.getGeneral();
        
        // Prevent state updates if component unmounted
        if (!isMounted) return;
        
        if (response.data) {
          setNews(response.data);
        } else {
          setNews([]);
        }
      } catch (err) {
        // Prevent state updates if component unmounted
        if (!isMounted) return;
        
        setError(err instanceof ApiError 
          ? err 
          : new ApiError(500, 'Failed to fetch general news'));
      } finally {
        // Prevent state updates if component unmounted
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    news,
    isLoading,
    error,
    refetch: fetchGeneralNews
  };
}
