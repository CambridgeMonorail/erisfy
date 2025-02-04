import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';


import { ErrorFallback } from '@erisfy/shadcnui-blocks';

import { App } from './app/app';
import { ErrorBoundary } from '../../../libs/shadcnui-blocks/src/lib/components/error-boundary';
import { ThemeProvider } from '@erisfy/shadcnui';

if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Failed to find root element. Ensure there is a <div id="root"> in your HTML.');
  }

  const root = ReactDOM.createRoot(rootElement);

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
    </StrictMode>
  );
}
