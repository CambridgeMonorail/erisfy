import { FC } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@erisfy/shadcnui';
import { Alert, AlertTitle, AlertDescription } from '@erisfy/shadcnui';

type ErrorFallbackProps = {
  /** The error object that triggered the fallback */
  error: Error & { 
    statusCode?: number;
    message: string;
  };
  /** Optional callback for custom reset behavior */
  onReset?: () => void;
};

/**
 * A fallback component to display when an error occurs in the application.
 * Provides a user-friendly error message and a refresh button.
 */
export const ErrorFallback: FC<ErrorFallbackProps> = ({ error, onReset }) => {
  const handleRefresh = (): void => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-background"
      data-testid="error-fallback"
    >
      <div className="max-w-md w-full">
        <Alert 
          variant="destructive"
          data-testid="error-alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <AlertTitle className="mb-2">Something went wrong</AlertTitle>
          <AlertDescription className="mb-4">
            {error.message || 'We apologize for the inconvenience. Our team has been notified of this issue.'}
          </AlertDescription>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-2"
              data-testid="refresh-button"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh Page
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};
