export type FilterType = {
  sector?: string;
  industry?: string;
  country?: string;
  marketCap?: [number, number];
  priceRange?: [number, number];
};

export type MarketOpportunitiesProps = {
  className?: string;
};
