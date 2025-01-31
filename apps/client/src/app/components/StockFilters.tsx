import { FC, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, Slider, Card, CardHeader, CardTitle, CardContent, Button, Tooltip, TooltipTrigger, TooltipContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@erisfy/shadcnui';

interface StockFiltersProps {
  onChange: (filters: any) => void;
}

const StockFilters: FC<StockFiltersProps> = ({ onChange }) => {
  const [sector, setSector] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [marketCap, setMarketCap] = useState<[number, number]>([0, 1000000]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = () => {
    onChange({
      sector,
      industry,
      country,
      marketCap,
      priceRange,
    });
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium mb-2 text-primary">
          Filters
        </CardTitle>
        <Button className="text-sm text-muted-foreground" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Expand Filters' : 'Collapse Filters'}
        </Button>
      </CardHeader>
      {!isCollapsed && (
        <CardContent>
          <div className="space-y-6">
            <label className="block text-sm font-bold text-gray-700">Sector</label>
            <Select onValueChange={(value) => {
              setSector(value as string);
              handleFilterChange();
            }}>
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
            <label className="block text-sm font-bold text-gray-700">Industry</label>
            <Select onValueChange={(value) => {
              setIndustry(value as string);
              handleFilterChange();
            }}>
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
            <label className="block text-sm font-bold text-gray-700">Country</label>
            <Select onValueChange={(value) => {
              setCountry(value as string);
              handleFilterChange();
            }}>
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
                <Button>More Filters</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div>
                    <label>Market Cap</label>
                    <Slider
                      value={marketCap}
                      onValueChange={(value) => {
                        setMarketCap(value as [number, number]);
                        handleFilterChange();
                      }}
                      min={0}
                      max={1000000}
                      step={10000}
                    />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div>
                    <label>Price Range</label>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value as [number, number]);
                        handleFilterChange();
                      }}
                      min={0}
                      max={1000}
                      step={10}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Selected Filters</h3>
              <ul className="list-disc list-inside">
                {selectedFilters.map((filter) => (
                  <li key={filter}>
                    <Tooltip>
                      <TooltipTrigger>{filter}</TooltipTrigger>
                      <TooltipContent>
                        <p>Definition and example of {filter}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export { StockFilters };
