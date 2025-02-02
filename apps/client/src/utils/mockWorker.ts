const MOCK_WORKER_ERROR = {
  INITIALIZATION_FAILED: 'Mock Service Worker initialization failed',
  UNKNOWN_ERROR: 'Unknown error occurred during mock worker initialization'
} as const;

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
  const useMocks = process.env.REACT_APP_USE_MOCKS === 'true';

  if (!useMocks) {
    return false;
  }

  try {
    const { worker } = await import('../mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    return true;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : MOCK_WORKER_ERROR.UNKNOWN_ERROR;
    
    console.error('[MockServiceWorker]:', MOCK_WORKER_ERROR.INITIALIZATION_FAILED, '-', errorMessage);
    return false;
  }
};
