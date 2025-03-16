import { FC, Suspense, memo } from 'react';
import { Route, Routes, RouteProps } from 'react-router-dom';
import { Toaster } from '@erisfy/shadcnui';
import { navigationConfig } from './constants/navigationConfig';
import { ErrorBoundary } from '@erisfy/shadcnui-blocks';

// Loading component for suspense fallback
const LoadingFallback: FC = memo(() => (
  <div className="flex items-center justify-center h-screen w-screen">
    <div className="animate-pulse text-primary">Loading...</div>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

// Route wrapper with data-testid
const RouteWrapper: FC<{ route: RouteProps & { path: string } }> = memo(({ route }) => (
  <div data-testid={`route-${route.path.replace(/\//g, '-').replace(/:/g, '')}`}>
    {route.element}
  </div>
));
RouteWrapper.displayName = 'RouteWrapper';

const App: FC = () => {
  return (
    <div
      className="bg-background text-foreground min-h-screen min-w-screen"
      data-testid="app-container"
    >
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {navigationConfig.routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteWrapper route={route} />}
              />
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Toaster data-testid="toaster" />
    </div>
  );
};

export { App };
