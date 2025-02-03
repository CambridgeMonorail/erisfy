import { shouldUseMocks } from './environment';

const MOCK_WORKER_ERROR = {
  INITIALIZATION_FAILED: 'Mock Service Worker initialization failed',
  UNKNOWN_ERROR: 'Unknown error occurred during mock worker initialization'
} as const;

/**
 * Gets the correct path for the mock service worker based on the environment
 */
const getMockServiceWorkerPath = (): string => {
  const base = import.meta.env.BASE_URL || '/';
  // Remove trailing slash if it exists
  const basePath = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${basePath}/mockServiceWorker.js`;
};

/**
 * Initializes the Mock Service Worker for development environment.
 * This function checks if mocks are enabled and starts the MSW worker if needed.
 * 
 * @returns Promise<boolean> True if worker started successfully, false otherwise
 * @throws Error if worker initialization fails
 * 
 * @example
 * ```ts
 * try {
 *   const isMockStarted = await initializeMockWorker();
 *   if (isMockStarted) {
 *     console.log('Mock worker initialized successfully');
 *   }
 * } catch (error) {
 *   console.error('Failed to initialize mock worker');
 * }
 * ```
 */
export const initializeMockWorker = async (): Promise<boolean> => {
  if (!shouldUseMocks()) {
    return false;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // Ensure global process is defined for MSW
    if (typeof global.process === 'undefined') {
      (window as any).process = { env: {} };
    }

    const { worker } = await import('../mocks/browser');
    
    // Only start if we're in a browser environment
    if (typeof worker.start === 'function') {
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: getMockServiceWorkerPath(),
        },
      });
      return true;
    }
    return false;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : MOCK_WORKER_ERROR.UNKNOWN_ERROR;
    
    console.error('[MockServiceWorker]:', MOCK_WORKER_ERROR.INITIALIZATION_FAILED, '-', errorMessage);
    return false;
  }
};
