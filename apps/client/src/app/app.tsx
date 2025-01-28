import { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from '@erisfy/shadcnui';
import { navigationConfig } from './constants/navigationConfig';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StockScreenerPage } from './pages/stock-screener/StockScreener';

const App: FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Navigated to ${location.pathname}`);
  }, [location]);

  return (
    <div
      className="bg-background text-foreground min-h-screen min-w-screen"
      data-testid="app-container"
    >
      <Routes>
        {navigationConfig.routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ErrorBoundary>
                <div data-testid={`route-${route.path.replace('/', '-')}`}>
                  {route.element}
                </div>
              </ErrorBoundary>
            }
          />
        ))}
        <Route
          path="/trading/stock-screener"
          element={
            <ErrorBoundary>
              <StockScreenerPage />
            </ErrorBoundary>
          }
        />
      </Routes>
      <Toaster data-testid="toaster" />
    </div>
  );
};

export { App };