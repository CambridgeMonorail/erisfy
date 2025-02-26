// libs/mocks/src/handlers/index.ts
import { userHandlers } from './users';
import { onboardingHandlers } from './onboarding';
import { marketInsightsHandlers } from './marketInsights';
// import other handlers as needed, e.g., posts
// import { postHandlers } from './posts';

export const handlers = [
  ...userHandlers,
  ...onboardingHandlers,
  ...marketInsightsHandlers,
  // ...postHandlers,
];
