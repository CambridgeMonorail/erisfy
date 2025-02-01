import { ValueTrail } from './ValueTrail';
import { MetricDisplay } from './metric-display';
import { Card, CardContent, cn } from '@erisfy/shadcnui';
import { PerformanceChangeMarker } from './PerformanceChangeMarker';

type StockMetrics = {
  dayChange: number;
  monthChange: number;
  yearChange: number;
  bollingerBands: number;
  psar: number;
  slowStochastic: number;
  fastStochastic: number;
  volume: number;
  askBidSpread: number;
  marketCap: number;
  pe: number;
  divYield: number;
  beta: number;
};

type StockQuoteProps = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  metrics: StockMetrics;
  className?: string;
};

type TimeChangeProps = {
  label: string;
  value: number;
  oldValue: number;
};

const TimeChange = ({ label, value, oldValue }: TimeChangeProps) => (
  <div className="flex flex-col w-[60px]">
    <div className="text-xs text-muted-foreground">{label}</div>
    <ValueTrail oldValue={oldValue} newValue={value} />
  </div>
);

export function StockQuote({
  symbol,
  name,
  price,
  change,
  metrics,
  className,
}: StockQuoteProps) {
  const clampValue = (value: number) => Math.max(0, Math.min(value, 100));

  return (
    <Card className={cn("w-full", className)} role="article" aria-label={`Stock quote for ${name} (${symbol})`}>
      <CardContent className="p-6">
        <div className="grid grid-cols-5 divide-x divide-border">
          {/* Basic Info Section */}
          <section className="pr-6" aria-label="Basic Information">
            <h3 className="text-sm font-medium mb-4">Basic</h3>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-lg text-muted-foreground">{symbol}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl font-bold" role="text" aria-label="Current price">
                  ${price.toFixed(2)}
                </div>
                <div
                  className={cn(
                    'text-lg',
                    change >= 0 ? 'text-success' : 'text-destructive'
                  )}
                  role="text"
                  aria-label="Price change"
                >
                  ${change >= 0 ? '+' : ''}
                  {change.toFixed(2)}
                </div>
              </div>
            </div>
          </section>

          {/* Changes Section */}
          <section className="px-6" aria-label="Changes over time">
            <h3 className="text-sm font-medium mb-4">Changes over time</h3>
            <div className="flex justify-between gap-4">
              <TimeChange 
                label="Day"
                value={clampValue(metrics.dayChange)}
                oldValue={metrics.dayChange - 1}
              />
              <TimeChange 
                label="Month"
                value={clampValue(metrics.monthChange)}
                oldValue={metrics.monthChange - 1}
              />
              <TimeChange 
                label="Year"
                value={clampValue(metrics.yearChange)}
                oldValue={metrics.yearChange - 1}
              />
            </div>
          </section>

          {/* Technical Indicators Section */}
          <section className="px-6" aria-label="Technical indicators">
            <h3 className="text-sm font-medium mb-4">Technical Indicators</h3>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col">
                <ValueTrail
                  oldValue={clampValue(metrics.bollingerBands - 1)}
                  newValue={clampValue(metrics.bollingerBands)}
                />
              </div>
              <div className="flex flex-col">
                <ValueTrail
                  oldValue={clampValue(metrics.psar - 0.5)}
                  newValue={clampValue(metrics.psar)}
                />
              </div>
              <div className="flex flex-col">
                <ValueTrail
                  oldValue={clampValue(metrics.slowStochastic - 2)}
                  newValue={clampValue(metrics.slowStochastic)}
                />
              </div>
              <div className="flex flex-col">
                <ValueTrail
                  oldValue={clampValue(metrics.fastStochastic - 1)}
                  newValue={clampValue(metrics.fastStochastic)}
                />
              </div>
            </div>
          </section>

          {/* Liquidity Section */}
          <section className="px-6" aria-label="Liquidity metrics">
            <h3 className="text-sm font-medium mb-4">Liquidity</h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricDisplay
                label="Volume"
                value={`${metrics.volume.toFixed(2)}B`}
              />
              <MetricDisplay
                label="Ask/Bid Spread"
                value={`${metrics.askBidSpread.toFixed(2)}%`}
              />
            </div>
          </section>

          {/* Value Section */}
          <section className="pl-6" aria-label="Value metrics">
            <h3 className="text-sm font-medium mb-4">Value</h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricDisplay
                label="Market Cap"
                value={metrics.marketCap.toFixed(2)}
              />
              <MetricDisplay label="P/E" value={metrics.pe.toFixed(1)} />
              <MetricDisplay
                label="Div & Yield"
                value={`${metrics.divYield.toFixed(2)}%`}
              />
              <MetricDisplay label="Beta" value={metrics.beta.toFixed(2)} />
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
