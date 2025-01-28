import { FC, useState } from 'react';
import { Select, Checkbox, Slider, Card, CardHeader, CardTitle, CardContent, Button } from '@erisfy/shadcnui';

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
            <Select
              value={sector}
              onValueChange={(value) => {
                setSector(value as string);
                handleFilterChange();
              }}
            >
              <option value="">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
            </Select>
            <label className="block text-sm font-medium text-gray-700">Industry</label>
            <Select
              value={industry}
              onValueChange={(value) => {
                setIndustry(value as string);
                handleFilterChange();
              }}
            >
              <option value="">All Industries</option>
              <option value="Software">Software</option>
              <option value="Banking">Banking</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Oil & Gas">Oil & Gas</option>
            </Select>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <Select
              value={country}
              onValueChange={(value) => {
                setCountry(value as string);
                handleFilterChange();
              }}
            >
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Germany">Germany</option>
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
