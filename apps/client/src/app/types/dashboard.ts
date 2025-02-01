export type FilterState = {
  sector?: string;
  industry?: string;
  country?: string;
  marketCap?: number[];
  priceRange?: number[];
};

export type DashboardCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};
