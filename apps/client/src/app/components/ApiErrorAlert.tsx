import { FC, HTMLAttributes } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from '@erisfy/shadcnui';
import { AlertTriangle } from 'lucide-react';
import { ApiError } from '@erisfy/api';

type ApiErrorAlertProps = {
  /**
   * The API error to display
   */
  error: ApiError;
  /**
   * Function called when the retry button is clicked
   */
  onRetryRequest: () => void;
  /**
   * Optional title for the alert, defaults to "Error"
   */
  title?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export const ApiErrorAlert: FC<ApiErrorAlertProps> = ({
  error,
  onRetryRequest,
  title = "Error",
  ...props
}) => (
  <Alert variant="destructive" role="alert" aria-live="assertive" {...props}>
    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>
      <p className="mb-4">{error.message}</p>
      <Button 
        variant="outline" 
        onClick={onRetryRequest}
        aria-label="Retry request"
      >
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);
