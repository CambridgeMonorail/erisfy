import { FC, useState } from 'react';
import { Select, Checkbox, Slider, Card, CardHeader, CardTitle, CardContent, Button } from '@erisfy/shadcnui';

interface StockFiltersProps {
  onChange: (filters: any) => void;
}

const StockFilters: FC<StockFiltersProps> = ({ onChange }) => {
  const [sector, setSector] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
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
            <Select
              label="Sector"
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
            </Select>
            <Select
              label="Industry"
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="">All Industries</option>
              <option value="Software">Software</option>
              <option value="Banking">Banking</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Oil & Gas">Oil & Gas</option>
            </Select>
            <Select
              label="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
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
                onChange={(value) => {
                  setMarketCap(value);
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
                onChange={(value) => {
                  setPriceRange(value);
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
