// libs/mocks/src/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create a worker instance
export const worker = setupWorker(...handlers);

// Add a custom bypass function to the worker
export const bypassAssets = (worker) => {
  // Apply this before starting the worker
  worker.events.on('request:start', ({ request }) => {
    const url = new URL(request.url);

    // Bypass asset requests (images, fonts, etc.)
    if (
      /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|mp4|webm|ogg)$/i.test(url.pathname) ||
      url.pathname.includes('/assets/')
    ) {
      return 'bypass';
    }

    return;
  });

  return worker;
};
