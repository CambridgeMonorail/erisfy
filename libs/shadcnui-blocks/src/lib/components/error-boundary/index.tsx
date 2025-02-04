import { Component, ReactNode, ErrorInfo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@erisfy/shadcnui';
import { Button } from '@erisfy/shadcnui';
import { AlertTriangle } from 'lucide-react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

const createErrorObject = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'string') {
    return new Error(error);
  }
  return new Error('An unknown error occurred');
};

const getErrorMessage = (error: unknown): string => {
  const errorObj = createErrorObject(error);
  return errorObj.message || 'An unknown error occurred';
};

const DefaultFallback = ({ error, reset }: { error: Error | null; reset: () => void }) => (
  <div className="p-4" role="alert">
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        <p className="mb-4">{error ? getErrorMessage(error) : 'An unexpected error occurred'}</p>
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  </div>
);

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { 
      hasError: true,
      error: createErrorObject(error)
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorObj = createErrorObject(error);
    this.props.onError?.(errorObj, errorInfo);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      const safeError = createErrorObject(error);
      
      if (typeof fallback === 'function') {
        return fallback(safeError, this.reset);
      }
      
      if (fallback) {
        return fallback;
      }

      return <DefaultFallback error={safeError} reset={this.reset} />;
    }

    return children;
  }
}
