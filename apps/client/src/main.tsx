import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from './app/app';
import { ErrorBoundary, ErrorFallback } from '@erisfy/shadcnui-blocks';
import { ThemeProvider } from '@erisfy/shadcnui';

async function enableMocking() {
  if (
    import.meta.env.VITE_REACT_APP_USE_MOCKS !== 'true'
  ) {
    return;
  }
  const { worker, bypassAssets } = await import('@erisfy/mocks');

  // Apply the bypass configuration before starting the worker
  bypassAssets(worker);

  await worker.start({
    onUnhandledRequest: 'warn',
    serviceWorker: {
      // Use relative path for development
      url: '/erisfy/mockServiceWorker.js',
    },
  });
}

if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error(
      'Failed to find root element. Ensure there is a <div id="root"> in your HTML.',
    );
  }

  const root = ReactDOM.createRoot(rootElement);

  enableMocking()
    .then(() => {
      root.render(
        <StrictMode>
          <ErrorBoundary
            fallback={(error) => (
              <ErrorFallback
                error={error}
                onRecover={() => window.location.reload()}
              />
            )}
          >
            <HashRouter>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </HashRouter>
          </ErrorBoundary>
        </StrictMode>,
      );
    })
    .catch(console.error);
}
