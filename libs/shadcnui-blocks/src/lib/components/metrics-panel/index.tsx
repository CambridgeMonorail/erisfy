import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

interface MetricsPanelProps {
  epsGrowth: number;
  roe: number;
  roa: number;
  profitabilityRatios: number[];
}

const MetricsPanel: FC<MetricsPanelProps> = ({ epsGrowth, roe, roa, profitabilityRatios }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>EPS Growth:</strong> {epsGrowth}%
          </div>
          <div>
            <strong>ROE:</strong> {roe}%
          </div>
          <div>
            <strong>ROA:</strong> {roa}%
          </div>
          <div>
            <strong>Profitability Ratios:</strong>
            <ul className="list-disc list-inside">
              {profitabilityRatios.map((ratio, index) => (
                <li key={index}>{ratio}%</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { MetricsPanel };
