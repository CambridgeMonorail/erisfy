import React, { FC } from 'react';
import clsx from 'clsx';

export type ValueTrailProps = {
  /**
   * Previous value (0-100).
   */
  oldValue: number;
  /**
   * Current value (0-100).
   */
  newValue: number;
  /**
   * Optional className for overriding default size or styling
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A vertical bar with a colored "vapor trail" connecting the old value
 * to the new value, plus a black circle to mark the current position.
 */
export const ValueTrail: FC<ValueTrailProps> = ({
  oldValue,
  newValue,
  className,
  ...rest
}) => {
  // Clamp both values between 0 and 100
  const clampedOld = Math.max(0, Math.min(oldValue, 100));
  const clampedNew = Math.max(0, Math.min(newValue, 100));

  // Are we going "up" or "down"?
  const goingUp = clampedNew < clampedOld;
  // The min and max positions among the two values
  const minVal = Math.min(clampedOld, clampedNew);
  const maxVal = Math.max(clampedOld, clampedNew);
  // Height of the trail in percentage terms
  const trailLength = maxVal - minVal;

  // Depending on direction, use a top->bottom or bottom->top gradient
  const gradientDirection = goingUp ? 'bg-gradient-to-b' : 'bg-gradient-to-t';

  // Container classes: pill shape, vertical orientation
  const containerClasses = clsx(
    'relative overflow-hidden rounded-full bg-muted', 
    'w-4 h-40',
    className
  );

  return (
    <div
      // Help screen readers: treat this as a visual indicator or chart
      role="img"
      aria-label={`Value changed from ${clampedOld} to ${clampedNew}`}
      className={containerClasses}
      {...rest}
    >
      {/* Gradient "trail" */}
      <div
        className={clsx(
          'absolute left-0 right-0 rounded-full overflow-hidden', 
          gradientDirection,
          'from-primary to-transparent'
        )}
        style={{
          // Position the trail from "minVal%" down to "maxVal%"
          top: `${minVal}%`,
          height: `${trailLength}%`
        }}
      />

      {/* Black circle for the new/current value */}
      <div
        className="absolute left-1/2 w-4 h-4 bg-black rounded-full 
                   -translate-x-1/2 -translate-y-1/2"
        style={{
          // Position circle at the newValue percentage along the bar
          top: `${clampedNew}%`
        }}
      />
    </div>
  );
};
