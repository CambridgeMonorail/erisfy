import { FC, useCallback, useMemo, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Slider,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@erisfy/shadcnui';
import { Filters } from '../types/filters';

type FilterValue = string | [number, number];

type StockFiltersProps = {
  onChange: (filters: Filters) => void;
  isLoading?: boolean;
  error?: string;
  initialFilters?: Partial<Filters>;
};

export const StockFilters: FC<StockFiltersProps> = ({
  onChange,
  isLoading = false,
  error,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<Filters>({
    sector: initialFilters?.sector ?? '',
    industry: initialFilters?.industry ?? '',
    country: initialFilters?.country ?? '',
    marketCap: initialFilters?.marketCap ?? [0, 1000000],
    priceRange: initialFilters?.priceRange ?? [0, 1000],
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: FilterValue) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        onChange(newFilters);
        return newFilters;
      });
    },
    [onChange],
  );

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
          Filters
        </CardTitle>
        <Button
          className="text-sm text-muted-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-expanded={!isCollapsed}
          aria-controls="filters-content"
        >
          {isCollapsed ? 'Expand Filters' : 'Collapse Filters'}
        </Button>
      </CardHeader>
      {error && (
        <div className="px-6 py-2 text-red-500" role="alert">
          {error}
        </div>
      )}
      <CardContent
        id="filters-content"
        className={isCollapsed ? 'hidden' : undefined}
      >
        <div className="space-y-6">
          <fieldset disabled={isLoading}>
            <Select
              value={filters.sector}
              onValueChange={(value) => handleFilterChange('sector', value)}
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
              onValueChange={(value) => handleFilterChange('industry', value)}
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
                  <SelectItem value="Pharmaceuticals">
                    Pharmaceuticals
                  </SelectItem>
                  <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.country}
              onValueChange={(value) => handleFilterChange('country', value)}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Additional filters">More Filters</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div className="w-full">
                    <label htmlFor="market-cap" className="block mb-2">
                      Market Cap
                    </label>
                    <Slider
                      id="market-cap"
                      value={filters.marketCap}
                      onValueChange={(value) =>
                        handleFilterChange(
                          'marketCap',
                          value as [number, number],
                        )
                      }
                      min={0}
                      max={1000000}
                      step={10000}
                      aria-label="Market cap range"
                    />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="w-full">
                    <label htmlFor="price-range" className="block mb-2">
                      Price Range
                    </label>
                    <Slider
                      id="price-range"
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        handleFilterChange(
                          'priceRange',
                          value as [number, number],
                        )
                      }
                      min={0}
                      max={1000}
                      step={10}
                      aria-label="Price range"
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFilters.length > 0 && (
              <div className="mt-4" aria-live="polite">
                <h3 className="text-lg font-medium mb-2">Active Filters</h3>
                <ul className="list-disc list-inside">
                  {activeFilters.map((filter) => (
                    <li key={filter}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            onClick={() =>
                              handleFilterChange(filter as keyof Filters, '')
                            }
                            aria-label={`Remove ${filter} filter`}
                          >
                            {filter}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to remove {filter} filter</p>
                        </TooltipContent>
                      </Tooltip>
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
