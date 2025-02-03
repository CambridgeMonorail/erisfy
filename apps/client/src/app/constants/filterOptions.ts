export const FILTER_OPTIONS = {
  sectors: [
    { value: 'all-sectors', label: 'All Sectors' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Energy', label: 'Energy' },
  ],
  industries: [
    { value: 'all-industries', label: 'All Industries' },
    { value: 'Software', label: 'Software' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'Oil & Gas', label: 'Oil & Gas' },
  ],
  countries: [
    { value: 'all-countries', label: 'All Countries' },
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'UK' },
    { value: 'Germany', label: 'Germany' },
  ],
} as const;

export const SLIDER_DEFAULTS = {
  marketCap: {
    min: 0,
    max: 1000000,
    step: 10000,
    defaultValue: [0, 1000000],
  },
  priceRange: {
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: [0, 1000],
  },
} as const;
