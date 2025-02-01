import { type ComponentPropsWithoutRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@erisfy/shadcnui';
import { AlertCircle } from 'lucide-react';

type NotFoundProps = ComponentPropsWithoutRef<'div'>;

export const NotFound = ({ className, ...props }: NotFoundProps) => {
  const location = useLocation();

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-background p-4"
      role="main"
      aria-labelledby="error-title"
      {...props}
    >
      <AlertCircle className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
      <h1 id="error-title" className="text-4xl font-bold mb-2 text-primary">
        404
      </h1>
      <p className="text-lg mb-4 text-foreground">Page Not Found</p>
      <p className="text-sm mb-6 text-muted-foreground text-center">
        The page "{location.pathname}" could not be found.
      </p>
      <Button asChild variant="default">
        <Link to="/">Return to Home</Link>
      </Button>
    </main>
  );
};
