import { FC, memo } from 'react';
import { Skeleton } from '@erisfy/shadcnui';
import { cn } from '@erisfy/shadcnui';

/**
 * Props for the MarketOpportunitiesSkeleton component
 */
export interface MarketOpportunitiesSkeletonProps {
  /** Optional CSS class name for additional styling */
  className?: string;
}

/**
 * Displays skeleton loading state for the Market Opportunities page
 * 
 * Renders placeholder UI elements that mimic the structure of the actual content
 * while data is being fetched from the API.
 */
export const MarketOpportunitiesSkeleton: FC<MarketOpportunitiesSkeletonProps> = memo(({
  className,
}) => (
  <div 
    className={cn("space-y-6 p-4", className)} 
    aria-busy="true" 
    aria-label="Loading market opportunities" 
    role="status"
  >
    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <Skeleton className="h-10 w-64" aria-hidden="true" />
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-48" aria-hidden="true" />
        <Skeleton className="h-10 w-24" aria-hidden="true" />
      </div>
    </div>

    {/* Market Overview Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-48" aria-hidden="true" />
      <Skeleton className="h-48" aria-hidden="true" />
    </div>

    {/* News Feed Skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-32" aria-hidden="true" />
      <Skeleton className="h-32" aria-hidden="true" />
      <Skeleton className="h-32" aria-hidden="true" />
    </div>

    {/* Footer Skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-24" aria-hidden="true" />
      <Skeleton className="h-16" aria-hidden="true" />
    </div>
    
    {/* Screen reader only text */}
    <div className="sr-only">Loading market opportunities data, please wait...</div>
  </div>
));

// Display name for debugging purposes
MarketOpportunitiesSkeleton.displayName = 'MarketOpportunitiesSkeleton';
