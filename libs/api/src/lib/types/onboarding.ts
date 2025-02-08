export type Onboarding = {
  id?: number;
  userId: string;
  hasViewed: boolean;
  chosenOptions: string[];
};

export type OnboardingFilter = {
  userId?: string;
  hasViewed?: boolean;
};

export type CreateOnboardingDto = Omit<Onboarding, 'id'>;
export type UpdateOnboardingDto = Partial<CreateOnboardingDto>;
