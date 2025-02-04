import type { ReactNode } from 'react';

export type CustomError = Error & {
  statusCode?: number;
  message: string;
  code?: string;
  details?: unknown;
};

export type ErrorFallbackProps = {
  error: CustomError;
  /** Primary handler to recover from the error state and reset the error boundary */
  onRecover: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (props: ErrorFallbackProps) => ReactNode;
};
