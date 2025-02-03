import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@erisfy/shadcnui';
import { Alert, AlertTitle, AlertDescription } from '@erisfy/shadcnui';
import { ErrorFallbackProps } from '../../types/error-boundary';


/**
 * A fallback component to display when an error occurs in the application.
 * Provides a user-friendly error message and a refresh button.
 */
/**
 * ErrorFallback component is a UI component that displays an error message
 * and a button to reset the error boundary when an error occurs.
 *
 * @param {Error} error - The error object that contains information about the error.
 * @param {() => void} resetErrorBoundary - A function to reset the error boundary.
 * @returns {JSX.Element} The rendered error fallback UI.
 *
 * @example
 * <ErrorFallback error={new Error('Something went wrong')} resetErrorBoundary={() => {}} />
 *
 * @component
 * @name ErrorFallback
 * @description This component is used to display a user-friendly error message
 * and provide a way to recover from the error by resetting the error boundary.
 * It uses the Alert component to display the error message and a Button component
 * to allow the user to refresh the page.
 *
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const errorMessage = error.message || 'An unexpected error occurred';
  const errorDetails = error.details ? `Details: ${JSON.stringify(error.details)}` : '';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full">
        <Alert 
          variant="destructive" 
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <AlertTitle className="mb-2">Something went wrong</AlertTitle>
          <AlertDescription className="mb-4">
            {errorMessage}
            {errorDetails && (
              <div className="mt-2 text-sm opacity-75">{errorDetails}</div>
            )}
          </AlertDescription>
          <div className="flex justify-end">
            <Button 
              variant="outline"
              size="sm"
              onClick={resetErrorBoundary}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};
