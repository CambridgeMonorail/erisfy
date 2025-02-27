import { IOnboarding, OnboardingsEndpoint, ApiError } from '@erisfy/api';
import { useState, useEffect } from 'react';
import { createApiConfig } from '../utils/apiConfig';

export const useOnboarding = (userId = 'guest') => {
  const [onboarding, setOnboarding] = useState<IOnboarding | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onboardingsClient = new OnboardingsEndpoint(createApiConfig());

    const fetchOnboarding = async () => {
      try {
        setIsLoading(true);
        const { data } = await onboardingsClient.getOnboardings({ userId });

        // Handle empty array case - this is normal for new users
        if (!data || data.length === 0) {
          setOnboarding(null);
          setError(null);
          return;
        }

        setOnboarding(data[0]);
        setError(null);
      } catch (err) {
        // Only set error for actual API failures
        if (err instanceof ApiError) {
          setError(`API Error: ${err.message}`);
        } else if (err instanceof Error) {
          setError(`Unexpected error: ${err.message}`);
        } else {
          setError('An unknown error occurred');
        }
        setOnboarding(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnboarding();
  }, [userId]);

  return { onboarding, isLoading, error };
};
