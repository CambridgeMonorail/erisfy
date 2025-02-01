import { FC } from 'react';

type MetricValue = string | number;

/**
 * MetricDisplay component displays a labeled metric with an optional sub-value.
 * Used for showing important statistics or measurements in a consistent format.
 */
type MetricDisplayProps = {
  /** The label describing the metric */
  label: string;
  /** The primary metric value */
  value: MetricValue;
  /** Optional secondary or supporting value */
  subValue?: MetricValue;
  /** Optional className for custom styling */
  className?: string;
  /** Optional HTML title attribute for additional context */
  title?: string;
};

export const MetricDisplay: FC<MetricDisplayProps> = ({
  label,
  value,
  subValue,
  className,
  title,
}) => {
  return (
    <div 
      className={`flex flex-col gap-1 ${className ?? ''}`}
      role="group"
      aria-labelledby={`metric-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
      title={title}
    >
      <dt 
        id={`metric-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-xs text-muted"
      >
        {label}
      </dt>
      <dd className="text-sm font-semibold text-foreground">
        {value}
      </dd>
      {subValue && (
        <dd className="text-xs text-muted">
          {subValue}
        </dd>
      )}
    </div>
  );
};

