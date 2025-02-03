export type FilterValue = string | [number, number] | undefined;

export type Filters = {
  sector?: string;
  industry?: string;
  country?: string;
  marketCap?: [number, number];
  priceRange?: [number, number];
};

export type SmartFilterLibraryProps = {
  filters: Filters;
  handleFilterChange: (newFilters: Filters) => void;
  handleSliderChange: (key: 'marketCap' | 'priceRange', value: number[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: string[];
  isLoading?: boolean;
  error?: Error | null;
};

export const SECTORS = ['Technology', 'Finance', 'Healthcare', 'Energy'] as const;
export type Sector = typeof SECTORS[number];

export const createDefaultFilters = (): Filters => ({
  priceRange: [0, 1000],
  marketCap: [0, 1000000000000],
  sector: '',
  industry: '',
  country: ''
});

export const ensureArrayValue = (value: string | string[]): string[] => {
  return Array.isArray(value) ? value : [value];
};


