// Basic shared interfaces without decorators
export interface IOnboarding {
  id?: number;
  userId: string;
  hasViewed: boolean;
  chosenOptions: string[];
}

export interface IOnboardingFilter {
  userId?: string;
  hasViewed?: boolean;
}

export type ICreateOnboardingDto = Omit<IOnboarding, 'id'>;

export type IUpdateOnboardingDto = Partial<ICreateOnboardingDto>;
