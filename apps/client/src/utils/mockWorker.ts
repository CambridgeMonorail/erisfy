/**
 * Initializes the Mock Service Worker for development environment
 * @returns Promise<boolean> indicating if the worker was successfully started
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[MockServiceWorker] Initialization failed:', errorMessage);
    return false;
  }
};
