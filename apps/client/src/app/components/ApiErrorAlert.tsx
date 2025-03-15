import { FC } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from '@erisfy/shadcnui';
import { AlertTriangle } from 'lucide-react';
import { ApiError } from '@erisfy/api';

type ApiErrorAlertProps = {
  error: ApiError;
  onRetry: () => void;
};

export const ApiErrorAlert: FC<ApiErrorAlertProps> = ({ error, onRetry }) => (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      <p className="mb-4">{error.message}</p>
      <Button variant="outline" onClick={onRetry}>
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);
