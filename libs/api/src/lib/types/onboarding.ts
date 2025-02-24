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

export interface ICreateOnboardingDto extends Omit<IOnboarding, 'id'> {}

export interface IUpdateOnboardingDto extends Partial<ICreateOnboardingDto> {}
