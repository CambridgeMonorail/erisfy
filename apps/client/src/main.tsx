import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';


import { App } from './app/app';
import { initializeMockWorker } from './utils/mockWorker';
import { ErrorBoundary } from './app/components/ErrorBoundary';
import { ThemeProvider } from '@erisfy/shadcnui/lib/theme';

// Initialize MSW in development
if (process.env.NODE_ENV === 'development') {
  initializeMockWorker();
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
      <HashRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
