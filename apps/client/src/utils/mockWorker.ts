export const initializeMockWorker = async (): Promise<void> => {
  try {
    const { worker } = await import('../mocks/browser');
    await worker.start();
  } catch (error) {
    console.error('Failed to initialize mock service worker:', error);
  }
};
