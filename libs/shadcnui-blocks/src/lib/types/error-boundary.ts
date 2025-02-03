import type { ReactNode } from 'react';

export type CustomError = Error & {
  statusCode?: number;
  message: string;
  code?: string;
  details?: unknown;
};

export type ErrorFallbackProps = {
  error: CustomError;
  resetErrorBoundary: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (props: ErrorFallbackProps) => ReactNode;
  onReset?: () => void;
};
