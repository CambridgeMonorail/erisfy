
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Initialize MSW worker with API handlers
export const worker = setupWorker(...handlers);