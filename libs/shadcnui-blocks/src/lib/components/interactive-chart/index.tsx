import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

interface InteractiveChartProps {
  data: { date: string; value: number }[];
}

const InteractiveChart: FC<InteractiveChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          Interactive Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Placeholder for the chart */}
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            Chart goes here
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { InteractiveChart };
