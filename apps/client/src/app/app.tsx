import { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from '@erisfy/shadcnui';
import { navigationConfig } from './constants/navigationConfig';
import { ErrorBoundary } from '../../../../libs/shadcnui-blocks/src/lib/components/error-boundary';
import { OnboardingFlow } from './pages/onboarding/OnboardingFlow';

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
      <ErrorBoundary>
        <Routes>
          {navigationConfig.routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <div data-testid={`route-${route.path.replace('/', '-')}`}>
                  {route.element}
                </div>
              }
            />
          ))}
          <Route path="/screener/onboarding-flow" element={<OnboardingFlow />} />
        </Routes>
      </ErrorBoundary>
      <Toaster data-testid="toaster" />
    </div>
  );
};

export { App };
