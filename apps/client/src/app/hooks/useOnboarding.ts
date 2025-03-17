import { IOnboarding, OnboardingsEndpoint, ApiError } from '@erisfy/api';
import { useState, useEffect, useCallback, useRef } from 'react';
import { createApiConfig } from '../utils/apiConfig';

/**
 * Type for onboarding operation error
 */
export type OnboardingError = ApiError | Error | null;

/**
 * Return type for useOnboarding hook
 */
export type OnboardingResult = {
  onboarding: IOnboarding | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

/**
 * Hook for fetching user onboarding data
 * @param userId - User ID to fetch onboarding data for (defaults to 'guest')
 * @returns Object containing onboarding data, loading state, error state and refetch function
 */
export function useOnboarding(userId = 'guest'): OnboardingResult {
  const [onboarding, setOnboarding] = useState<IOnboarding | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref to track component mounting state
  const isMountedRef = useRef<boolean>(true);
  const clientRef = useRef<OnboardingsEndpoint | null>(null);

  // Initialize the client reference once with the standard API config
  if (!clientRef.current) {
    clientRef.current = new OnboardingsEndpoint(createApiConfig());
  }

  /**
   * Fetches onboarding data for the specified user
   */
  const fetchOnboarding = useCallback(async (): Promise<void> => {
    // Safety check for client instance
    if (!clientRef.current) {
      setError('API client not initialized');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await clientRef.current.getOnboardings({ userId });

      // Only update state if the component is still mounted
      if (isMountedRef.current) {
        // Handle empty array case - this is normal for new users
        if (!data || data.length === 0) {
          setOnboarding(null);
          setError(null);
          return;
        }

        setOnboarding(data[0]);
        setError(null);
      }
    } catch (err) {
      // Only update state if the component is still mounted
      if (isMountedRef.current) {
        if (err instanceof ApiError) {
          setError(`API Error: ${err.message}`);
        } else if (err instanceof Error) {
          setError(`Unexpected error: ${err.message}`);
        } else {
          setError('An unknown error occurred');
        }
        setOnboarding(null);
      }
    } finally {
      // Only update state if the component is still mounted
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [userId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Initial data fetch
  useEffect(() => {
    void fetchOnboarding();
  }, [fetchOnboarding]);

  return {
    onboarding,
    isLoading,
    error,
    refetch: fetchOnboarding
  };
}
