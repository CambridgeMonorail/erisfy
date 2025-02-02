// React and DOM imports
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Internal components and utilities
import { App } from './app/app';
import { ErrorBoundary } from './app/components/ErrorBoundary';
import { initializeMockWorker } from './utils/mockWorker';

// Shared components
import { ThemeProvider } from '@erisfy/shadcnui/lib/theme';
import { ErrorFallback } from '@erisfy/shadcnui-blocks';

// Initialize MSW in development
if (process.env.NODE_ENV === 'development') {
  initializeMockWorker();
}

// Ensure we're in a browser context
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ErrorBoundary 
        fallback={(error: Error) => (
          <ErrorFallback error={error} />
        )}
      >
        <HashRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </HashRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
