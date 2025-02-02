import { FC } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@erisfy/shadcnui';
import { Alert, AlertTitle, AlertDescription } from '@erisfy/shadcnui';

type ErrorFallbackProps = {
  error: Error;
};

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="mb-2">Something went wrong</AlertTitle>
          <AlertDescription className="mb-4">
            We apologize for the inconvenience. Our team has been notified of this issue.
          </AlertDescription>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};
