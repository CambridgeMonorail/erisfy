import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@erisfy/shadcnui';
import { navigationConfig } from './constants/navigationConfig';
import { ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { OnboardingFlow } from './pages/onboarding/OnboardingFlow';

const App: FC = () => {
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
