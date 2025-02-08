import { ApiError, Onboarding, OnboardingsEndpoint } from '@erisfy/api';
import { useState, useEffect } from 'react';
import { createApiConfig } from '../utils/apiConfig';

export const useOnboarding = (userId = 'guest') => {
  const [onboarding, setOnboarding] = useState<Onboarding | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onboardingsClient = new OnboardingsEndpoint(createApiConfig());

    const fetchOnboarding = async () => {
      try {
        setIsLoading(true);
        const { data } = await onboardingsClient.getOnboardings({ userId });
        setOnboarding(data[0] || null); // Ensure null if no data
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
