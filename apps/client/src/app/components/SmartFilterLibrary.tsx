import { FC, useState, useCallback, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Slider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@erisfy/shadcnui';

interface SmartFilterLibraryProps {
  filters: {
    sector?: string;
    industry?: string;
    country?: string;
    marketCap?: [number, number];
    priceRange?: [number, number];
  };
  handleFilterChange: (newFilters: {
    sector?: string;
    industry?: string;
    country?: string;
    marketCap?: [number, number];
    priceRange?: [number, number];
  }) => void;
  handleSliderChange: (key: 'marketCap' | 'priceRange', value: number[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: string[];
}

const SmartFilterLibrary: FC<SmartFilterLibraryProps> = ({
  filters,
  handleFilterChange,
  handleSliderChange,
  searchQuery,
  setSearchQuery,
  selectedFilters,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeFilters = useMemo(
    () =>
      Object.entries(filters)
        .filter(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              value[0] !== 0 ||
              value[1] !== (key === 'marketCap' ? 1000000 : 1000)
            );
          }
          return value !== '';
        })
        .map(([key]) => key),
    [filters],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium mb-2 text-primary">
          Smart Filter Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <fieldset>
            <Select
              value={filters.sector}
              onValueChange={(value) => handleFilterChange({ ...filters, sector: value })}
              aria-label="Select sector"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-sectors">All Sectors</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.industry}
              onValueChange={(value) => handleFilterChange({ ...filters, industry: value })}
              aria-label="Select industry"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-industries">All Industries</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Banking">Banking</SelectItem>
                  <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                  <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.country}
              onValueChange={(value) => handleFilterChange({ ...filters, country: value })}
              aria-label="Select country"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-countries">All Countries</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-full">
              <label htmlFor="market-cap" className="block mb-2">
                Market Cap
              </label>
              <Slider
                id="market-cap"
                value={filters.marketCap}
                onValueChange={(value) => handleSliderChange('marketCap', value)}
                min={0}
                max={1000000}
                step={10000}
                aria-label="Market cap range"
              />
            </div>

            <div className="w-full">
              <label htmlFor="price-range" className="block mb-2">
                Price Range
              </label>
              <Slider
                id="price-range"
                value={filters.priceRange}
                onValueChange={(value) => handleSliderChange('priceRange', value)}
                min={0}
                max={1000}
                step={10}
                aria-label="Price range"
              />
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4" aria-live="polite">
                <h3 className="text-lg font-medium mb-2">Active Filters</h3>
                <ul className="list-disc list-inside">
                  {activeFilters.map((filter) => (
                    <li key={filter}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleFilterChange({ ...filters, [filter]: '' })}
                              aria-label={`Remove ${filter} filter`}
                            >
                              {filter}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to remove {filter} filter</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </fieldset>
        </div>
      </CardContent>
    </Card>
  );
};

export { SmartFilterLibrary };
