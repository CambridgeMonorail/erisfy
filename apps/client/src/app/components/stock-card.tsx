

import { TrailIndicator } from "./trail-indicator"

import { MetricDisplay } from "./metric-display"
import { Card, CardContent, cn } from "@erisfy/shadcnui"

interface StockQuoteProps {
  symbol: string
  name: string
  price: number
  change: number
  metrics: {
    dayChange: number
    monthChange: number
    yearChange: number
    bollingerBands: number
    psar: number
    slowStochastic: number
    fastStochastic: number
    volume: number
    askBidSpread: number
    marketCap: number
    pe: number
    divYield: number
    beta: number
  }
}

export function StockQuote({ symbol, name, price, change, metrics }: StockQuoteProps) {
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
                <div className={cn("text-lg", change >= 0 ? "text-green-600" : "text-red-600")}>
                  ${change >= 0 ? "+" : ""}
                  {change.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Changes over time */}
          <div className="px-6">
            <h3 className="text-sm font-medium mb-4">Changes over time</h3>
            <div className="flex justify-between gap-4">
              <TrailIndicator
                currentValue={metrics.dayChange}
                previousValue={0}
                max={5}
                min={-5}
                color="bg-sky-400"
                label="Day Change"
                value={`${metrics.dayChange}%`}
              />
              <TrailIndicator
                currentValue={metrics.monthChange}
                previousValue={0}
                max={10}
                min={-10}
                color="bg-sky-400"
                label="Month Change"
                value={`${metrics.monthChange}%`}
              />
              <TrailIndicator
                currentValue={metrics.yearChange}
                previousValue={0}
                max={20}
                min={-20}
                color="bg-sky-400"
                label="52 W Change"
                value={`${metrics.yearChange}%`}
              />
            </div>
          </div>

          {/* Technical Indicators */}
          <div className="px-6">
            <h3 className="text-sm font-medium mb-4">Technical Indicators</h3>
            <div className="flex justify-between gap-2">
              <TrailIndicator
                currentValue={metrics.bollingerBands}
                previousValue={metrics.bollingerBands - 1}
                max={30}
                min={0}
                color="bg-sky-400"
                label="Bollinger Bands"
                value={metrics.bollingerBands.toString()}
              />
              <TrailIndicator
                currentValue={metrics.psar}
                previousValue={metrics.psar - 0.5}
                max={2}
                min={0}
                color="bg-sky-400"
                label="PSAR"
                value={metrics.psar.toString()}
              />
              <TrailIndicator
                currentValue={metrics.slowStochastic}
                previousValue={metrics.slowStochastic - 2}
                max={10}
                min={0}
                color="bg-sky-400"
                label="Slow Stochastic"
                value={metrics.slowStochastic.toString()}
              />
              <TrailIndicator
                currentValue={metrics.fastStochastic}
                previousValue={metrics.fastStochastic - 1}
                max={20}
                min={0}
                color="bg-sky-400"
                label="Fast Stochastic"
                value={metrics.fastStochastic.toString()}
              />
            </div>
          </div>

          {/* Liquidity */}
          <div className="px-6">
            <h3 className="text-sm font-medium mb-4">Liquidity</h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricDisplay label="Volume" value={`${metrics.volume.toFixed(2)}B`} />
              <MetricDisplay label="Ask/Bid Spread" value={`${metrics.askBidSpread.toFixed(2)}%`} />
            </div>
          </div>

          {/* Value */}
          <div className="pl-6">
            <h3 className="text-sm font-medium mb-4">Value</h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricDisplay label="Market Cap" value={metrics.marketCap.toFixed(2)} />
              <MetricDisplay label="P/E" value={metrics.pe.toFixed(1)} />
              <MetricDisplay label="Div & Yield" value={`${metrics.divYield.toFixed(2)}%`} />
              <MetricDisplay label="Beta" value={metrics.beta.toFixed(2)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

