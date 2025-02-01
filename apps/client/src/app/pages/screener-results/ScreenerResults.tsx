import { FC, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Input,
} from '@erisfy/shadcnui';
import { Pagination } from '../../components/Pagination';
import { StockTable } from '../../components/StockTable';

import { SearchBar } from '../../components/SearchBar';
import { generateMockData, StockData } from '../../utils/mockData';
import { Filters, createDefaultFilters } from '../../types/filters';
import { StockFilters } from '../../components/StockFilters';

const ScreenerResultsPage: FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filters, setFilters] = useState<Filters>(createDefaultFilters());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const data = generateMockData(100);
    setStocks(data);
  }, []);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.companyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      Object.keys(filters).length === 0 ||
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        switch (key) {
          case 'priceRange': {
            const [min, max] = value as [number, number];
            return stock.currentPrice >= min && stock.currentPrice <= max;
          }
          case 'marketCap': {
            const [min, max] = value as [number, number];
            return stock.marketCap >= min && stock.marketCap <= max;
          }
          case 'sector': {
            const sectorVal = value as string;
            return !sectorVal || sectorVal === stock.sector;
          }
          default:
            return true;
        }
      });

    return matchesSearch && matchesFilters;
  });

  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Market Opportunities
          </CardTitle>
          <div className="flex items-center space-x-4">
            <SearchBar onSearch={handleSearch} />
            <Input
              type="text"
              placeholder="Use AI to quickly build your filter!"
              className="w-full"
            />
          </div>
        </CardHeader>
        <CardContent>
          <StockFilters onChange={handleFilterChange} />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Selected Filters</h3>
            <TooltipProvider>
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
            </TooltipProvider>
          </div>
          <StockTable stocks={paginatedStocks} />
          <Pagination
            currentPage={currentPage}
            totalItems={filteredStocks.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export { ScreenerResultsPage };
