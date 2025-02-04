/**
 * A loading spinner component that supports multiple variants and sizes.
 * @example
 * ```tsx
 * <Spinner variant="primary" size="lg" />
 * <Spinner size={32} />
 * ```
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@erisfy/shadcnui';

/**
 * Spinner variant styles using class-variance-authority
 * @see https://cva.style/docs
 */
const spinnerVariants = cva(
  'relative inline-block aspect-square transform-gpu',
  {
    variants: {
      variant: {
        default: '[&>div]:bg-foreground',
        primary: '[&>div]:bg-primary',
        secondary: '[&>div]:bg-secondary',
        destructive: '[&>div]:bg-destructive',
        muted: '[&>div]:bg-muted-foreground',
      },
      size: {
        sm: 'size-4',
        default: 'size-5',
        lg: 'size-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

/**
 * Props for the Spinner component
 * @typedef SpinnerProps
 * @property {string} [className] - Additional CSS classes
 * @property {('default' | 'primary' | 'secondary' | 'destructive' | 'muted')} [variant] - Visual style variant
 * @property {('sm' | 'default' | 'lg' | number)} [size] - Size of the spinner
 */
export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof spinnerVariants>, 'size'> {
  className?: string;
  size?: VariantProps<typeof spinnerVariants>['size'] | number;
}

/**
 * A loading spinner component that indicates content is being loaded
 * @param {SpinnerProps} props - Component props
 * @returns {JSX.Element} Spinner component
 */
export const Spinner = React.memo(({ className, variant, size = 'default' }: SpinnerProps) => (
  <div
    role="status"
    aria-label="Loading"
    className={cn(
      typeof size === 'string'
        ? spinnerVariants({ variant, size })
        : spinnerVariants({ variant }),
      className,
    )}
    style={typeof size === 'number' ? { width: size, height: size } : undefined}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="animate-spinner absolute left-[46.5%] top-[4.4%] h-[24%] w-[7%]
          origin-[center_190%] rounded-full opacity-[0.1] will-change-transform"
        style={{
          transform: `rotate(${i * 30}deg)`,
          animationDelay: `${(i * 0.083).toFixed(3)}s`,
        }}
        aria-hidden="true"
      />
    ))}
    <span className="sr-only">Loading...</span>
  </div>
));


export { spinnerVariants };
