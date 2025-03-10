import { FC } from 'react';
import { Skeleton } from '@erisfy/shadcnui';

export const MarketOpportunitiesSkeleton: FC = () => (
  <div className="space-y-6 p-4">
    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <Skeleton className="h-10 w-64" />
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>

    {/* Market Overview Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>

    {/* News Feed Skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>

    {/* Footer Skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-24" />
      <Skeleton className="h-16" />
    </div>
  </div>
);
