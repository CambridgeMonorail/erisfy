import { useState } from 'react';
import { OnboardingsEndpoint, type ICreateOnboardingDto } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';
import type { InvestmentStyle, RiskTolerance } from '../pages/onboarding/onboardingData.js';

export const useOnboardingPreferences = (userId = 'guest') => {
  const [investmentStyle, setInvestmentStyle] = useState<InvestmentStyle['value'] | null>(null);
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance['value'] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onboardingsClient = new OnboardingsEndpoint(createApiConfig());

  const savePreferences = async () => {
    if (!investmentStyle || !riskTolerance) return;

    try {
      setIsSaving(true);
      // First get or create the onboarding record
      const { data: [existingData] } = await onboardingsClient.getOnboardings({ userId });
      const onboardingId = existingData?.id ?? 1; // Default to 1 if no existing record

      const updateData: Partial<ICreateOnboardingDto> = {
        userId,
        hasViewed: true,
        chosenOptions: [`style:${investmentStyle}`, `risk:${riskTolerance}`]
      };

      const { data } = await onboardingsClient.updateOnboarding(onboardingId, updateData);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save preferences');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    investmentStyle,
    setInvestmentStyle,
    riskTolerance,
    setRiskTolerance,
    savePreferences,
    isSaving,
    error
  };
};
