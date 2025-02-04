import { AlertCircle, RefreshCw } from 'lucide-react';

import { Button, cn } from '@erisfy/shadcnui';
import { Alert, AlertTitle, AlertDescription } from '@erisfy/shadcnui';
import { type ErrorFallbackProps } from '../../types/error-boundary';

type ErrorFallbackVariant = 'default' | 'destructive';

type ExtendedErrorFallbackProps = ErrorFallbackProps & {
  className?: string;
  variant?: ErrorFallbackVariant;
  isLoading?: boolean;
  containerClassName?: string;
  retryButtonText?: string;
  titleText?: string;
};

export const ErrorFallback = ({ 
  error, 
  onRecover,
  className,
  variant = 'destructive',
  isLoading = false,
  containerClassName,
  retryButtonText = 'Try Again',
  titleText = 'Something went wrong'
}: ExtendedErrorFallbackProps) => {
  const errorMessage = error.message || 'An unexpected error occurred';
  const errorDetails = error.details ? `Details: ${JSON.stringify(error.details)}` : '';

  return (
    <div 
      className={cn(
        "min-h-screen flex items-center justify-center p-4 bg-background",
        containerClassName
      )}
      role="alert"
      aria-live="assertive"
      data-testid="error-fallback"
    >
      <div className={cn("max-w-md w-full", className)}>
        <Alert 
          variant={variant}
          data-testid="error-alert"
        >
          <AlertCircle 
            className="h-5 w-5" 
            aria-hidden="true"
            data-testid="error-icon"
          />
          <AlertTitle className="mb-2">{titleText}</AlertTitle>
          <AlertDescription className="mb-4">
            <div data-testid="error-message">
              {errorMessage}
            </div>
            {errorDetails && (
              <div 
                className="mt-2 text-sm opacity-75"
                data-testid="error-details"
              >
                {errorDetails}
              </div>
            )}
          </AlertDescription>
          <div className="flex justify-end">
            <Button 
              variant="outline"
              size="sm"
              onClick={onRecover}
              className="flex items-center gap-2"
              disabled={isLoading}
              data-testid="retry-button"
            >
              <RefreshCw 
                className={cn(
                  "h-4 w-4",
                  isLoading && "animate-spin"
                )} 
                aria-hidden="true" 
              />
              {retryButtonText}
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};
