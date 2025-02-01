export type Filters = {
  priceRange: [number, number];
  marketCap: [number, number];
  sector: string;
  industry: string;
  country: string;
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


