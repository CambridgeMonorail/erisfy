// libs/mocks/src/handlers/index.ts
import { http, HttpResponse } from 'msw';
import { userHandlers } from './users';
import { onboardingHandlers } from './onboarding';
import { marketInsightsHandlers } from './marketInsights';
// import other handlers as needed, e.g., posts
// import { postHandlers } from './posts';

// Add a catch-all handler for debugging purposes
const debugHandlers = [
  http.all('*', ({ request }) => {
    const url = new URL(request.url);

    // Skip assets and let them passthrough
    if (
      /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|mp4|webm|ogg)$/i.test(url.pathname) ||
      url.pathname.includes('/assets/')
    ) {
      return;  // Return undefined to let the request pass through
    }

    console.log('[MSW Debug] Caught unhandled request:', request.method, request.url);
    console.log('[MSW Debug] Headers:', Object.fromEntries([...request.headers.entries()]));
    return HttpResponse.error();
  })
];

export const handlers = [
  ...userHandlers,
  ...onboardingHandlers,
  ...marketInsightsHandlers,
  // ...postHandlers,
  ...debugHandlers, // This should be last so it only catches requests that weren't handled
];
