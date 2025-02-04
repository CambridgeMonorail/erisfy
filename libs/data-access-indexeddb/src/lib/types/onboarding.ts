
  // 1) Add a new interface for Onboarding
  export interface Onboarding {
    id?: number;
    userId: string;           // which user
    hasViewed: boolean;       // have they seen onboarding?
    chosenOptions: string[];  // any selected preferences
  }