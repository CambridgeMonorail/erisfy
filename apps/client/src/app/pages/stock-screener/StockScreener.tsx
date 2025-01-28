import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

const StockScreenerPage: FC = () => {
  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Stock Screener Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the Stock Screener Page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { StockScreenerPage };
