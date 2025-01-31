import { ValueTrail } from './ValueTrail';
import { MetricDisplay } from './metric-display';
import { Card, CardContent, cn } from '@erisfy/shadcnui';
import { PerformanceChangeMarker } from './PerformanceChangeMarker';

interface StockQuoteProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  metrics: {
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
}

export function StockQuote({
  symbol,
  name,
  price,
  change,
  metrics,
}: StockQuoteProps) {
  // Clamp values between 0 and 100
  const clampValue = (value: number) => Math.max(0, Math.min(value, 100));

  return (
    <Card className="w-full ">
      <CardContent className="p-6">
        <div className="grid grid-cols-5 divide-x divide-border">
          {/* Basic */}
          <div className="pr-6">
            <h3 className="text-sm font-medium mb-4">Basic</h3>
            <div className="space-y-4">
              <div className="bg-[#f5f0e8] rounded-lg p-4">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-lg text-muted-foreground">{symbol}</p>
              </div>
              <div className="bg-[#f5f0e8] rounded-lg p-4">
                <div className="text-2xl font-bold">${price.toFixed(2)}</div>
                <div
                  className={cn(
                    'text-lg',
                    change >= 0 ? 'text-green-600' : 'text-red-600',
                  )}
                >
                  ${change >= 0 ? '+' : ''}
                  {change.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Changes over time */}
          <div className="px-6">
            <h3 className="text-sm font-medium mb-4">Changes over time</h3>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-[60px]">
                <div className="text-xs text-muted-foreground">Day Change</div>
                <ValueTrail
                  oldValue={10}
                  newValue={clampValue(metrics.dayChange)}
                />
              </div>
              <div className="flex flex-col w-[60px]">
              <div className="text-xs text-muted-foreground">Day Change</div>
                <ValueTrail
                  oldValue={20}
                  newValue={clampValue(metrics.monthChange)}
                />
              </div>
              <div className="flex flex-col w-[60px]">
              <div className="text-xs text-muted-foreground">Day Change</div>
                <ValueTrail
                  oldValue={30}
                  newValue={clampValue(metrics.yearChange)}
                />
              </div>
            </div>
          </div>

          {/* Technical Indicators */}
          <div className="px-6">
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
          </div>

          {/* Liquidity */}
          <div className="px-6">
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
          </div>

          {/* Value */}
          <div className="pl-6">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
