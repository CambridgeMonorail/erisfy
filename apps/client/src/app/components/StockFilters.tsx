import { FC, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, Slider, Card, CardHeader, CardTitle, CardContent, Button } from '@erisfy/shadcnui';

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

  const handleFilterChange = () => {
    onChange({
      sector,
      industry,
      country,
      marketCap,
      priceRange,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          Filters
        </CardTitle>
        <Button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Expand Filters' : 'Collapse Filters'}
        </Button>
      </CardHeader>
      {!isCollapsed && (
        <CardContent>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Sector</label>
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
            <label className="block text-sm font-medium text-gray-700">Industry</label>
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
            <label className="block text-sm font-medium text-gray-700">Country</label>
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
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export { StockFilters };
