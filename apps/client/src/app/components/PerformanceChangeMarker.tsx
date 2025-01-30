import React, { FC } from 'react';
import clsx from 'clsx';

type Orientation = 'horizontal' | 'vertical';

export type PerformanceChangeMarkerProps = {
  /**
   * Numeric value of the performance change (0 - 100).
   */
  value: number;

  /**
   * Orientation of the performance marker (horizontal or vertical).
   * @default "horizontal"
   */
  orientation?: Orientation;

  /**
   * Additional class names for custom styling (e.g. explicit width/height).
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A responsive performance change marker that can display a percentage value in both
 * horizontal or vertical orientation.
 */
export const PerformanceChangeMarker: FC<PerformanceChangeMarkerProps> = ({
  value,
  orientation = 'horizontal',
  className,
  ...rest
}) => {
  // Ensure value stays within 0-100
  const clampedValue = Math.max(0, Math.min(value, 100));

  // Determine if horizontal
  const isHorizontal = orientation === 'horizontal';

  // Base container classes
  const containerClasses = clsx(
    'relative bg-muted  rounded-full overflow-hidden', // main track styles
    {
      'w-[180px] h-[22px]': isHorizontal, // default horizontal size
      'h-[180px] w-[22px]': !isHorizontal, // default vertical size
    },
    className // allow overrides
  );

  // Dynamic width/height for the filled portion
  const fillerStyles = isHorizontal
    ? { width: `${clampedValue}%`, height: '100%' }
    : { width: '100%', height: `${clampedValue}%` };

  return (
    <div
      className={containerClasses}
      data-testid="performance-change-marker"
      {...rest}
    >
      <div
        className="bg-primary transition-all duration-300"
        style={fillerStyles}
        data-testid="performance-change-marker-filler"
      />
    </div>
  );
};