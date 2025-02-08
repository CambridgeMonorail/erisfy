import { ApiError, Onboarding, OnboardingsEndpoint } from '@erisfy/api';

import { useState, useEffect } from 'react';
import { createApiConfig } from '../utils/apiConfig';

export const useOnboarding = (userId: string = 'guest') => {
  const onboardingsClient = new OnboardingsEndpoint(createApiConfig());
  const [onboarding, setOnboarding] = useState<Onboarding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        setIsLoading(true);
        const { data } = await onboardingsClient.getOnboardings({ userId });
        setOnboarding(data[0]); // Assume we want the first onboarding record
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Failed to fetch onboarding data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnboarding();
  }, [userId]);

  return { onboarding, isLoading, error };
};
