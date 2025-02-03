import { FC, useState, useMemo } from 'react';
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
  Alert,
} from '@erisfy/shadcnui';
import { AlertCircle } from 'lucide-react';
import { type SmartFilterLibraryProps } from '../types/filters';
import { FILTER_OPTIONS, SLIDER_DEFAULTS } from '../constants/filterOptions';

export const SmartFilterLibrary: FC<SmartFilterLibraryProps> = ({
  filters,
  handleFilterChange,
  handleSliderChange,
  searchQuery,
  setSearchQuery,
  selectedFilters,
  isLoading,
  error,
}) => {
  const [sliderValues, setSliderValues] = useState({
    marketCap: filters.marketCap || SLIDER_DEFAULTS.marketCap.defaultValue,
    priceRange: filters.priceRange || SLIDER_DEFAULTS.priceRange.defaultValue,
  });

  const activeFilters = useMemo(
    () => Object.entries(filters).filter(([_, value]) => {
      if (Array.isArray(value)) {
        const [min, max] = value;
        return min !== 0 || max !== (value === filters.marketCap ? 1000000 : 1000);
      }
      return value !== '';
    }).map(([key]) => key),
    [filters]
  );

  if (error) {
    return (
      <Alert variant="destructive" data-testid="filter-error">
        <AlertCircle className="h-4 w-4" />
        <span>Error loading filters: {error.message}</span>
      </Alert>
    );
  }

  return (
    <Card data-testid="smart-filter-library">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-primary">
          Smart Filter Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset disabled={isLoading}>
            {/* Sector Select */}
            <div className="space-y-4">
              <Select
                value={filters.sector}
                onValueChange={(value) => handleFilterChange({ ...filters, sector: value })}
                data-testid="sector-select"
              >
                <SelectTrigger className="w-full" aria-label="Select sector">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FILTER_OPTIONS.sectors.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Industry Select */}
              <Select
                value={filters.industry}
                onValueChange={(value) => handleFilterChange({ ...filters, industry: value })}
                data-testid="industry-select"
              >
                <SelectTrigger className="w-full" aria-label="Select industry">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FILTER_OPTIONS.industries.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Sliders with Tooltips */}
              <div className="space-y-6">
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <label htmlFor="market-cap" className="block mb-2 cursor-help">
                          Market Cap (${sliderValues.marketCap[0]} - ${sliderValues.marketCap[1]})
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter stocks by market capitalization range</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Slider
                    id="market-cap"
                    value={sliderValues.marketCap}
                    onValueChange={(value) => {
                      setSliderValues(prev => ({ ...prev, marketCap: value }));
                      handleSliderChange('marketCap', value);
                    }}
                    min={SLIDER_DEFAULTS.marketCap.min}
                    max={SLIDER_DEFAULTS.marketCap.max}
                    step={SLIDER_DEFAULTS.marketCap.step}
                    className="mt-2"
                    data-testid="market-cap-slider"
                  />
                </div>

                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <label htmlFor="price-range" className="block mb-2 cursor-help">
                          Price Range (${sliderValues.priceRange[0]} - ${sliderValues.priceRange[1]})
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter stocks by price range</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Slider
                    id="price-range"
                    value={sliderValues.priceRange}
                    onValueChange={(value) => {
                      setSliderValues(prev => ({ ...prev, priceRange: value }));
                      handleSliderChange('priceRange', value);
                    }}
                    min={SLIDER_DEFAULTS.priceRange.min}
                    max={SLIDER_DEFAULTS.priceRange.max}
                    step={SLIDER_DEFAULTS.priceRange.step}
                    className="mt-2"
                    data-testid="price-range-slider"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4" aria-live="polite" data-testid="active-filters">
              <h3 className="text-lg font-medium mb-2">Active Filters</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {activeFilters.map((filter) => (
                  <li key={filter}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleFilterChange({ ...filters, [filter]: '' })}
                            className="text-sm px-2 py-1 bg-secondary rounded-md hover:bg-secondary/80"
                            aria-label={`Remove ${filter} filter`}
                            data-testid={`remove-filter-${filter}`}
                          >
                            {filter} ×
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
        </form>
      </CardContent>
    </Card>
  );
};

export type { SmartFilterLibraryProps };
