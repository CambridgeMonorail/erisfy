import { FC, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Select, Checkbox, Slider } from '@erisfy/shadcnui';
import { Pagination } from '../../components/Pagination'; // Ensure correct import
import { StockTable } from '../../components/StockTable';
import { StockFilters } from '../../components/StockFilters';
import { SearchBar } from '../../components/SearchBar';
import { generateMockData, StockData } from '../../utils/mockData';

const ScreenerResultsPage: FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const data = generateMockData(100);
    setStocks(data);
  }, []);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredStocks = stocks.filter((stock) => {
    // Apply filters to the stock data
    return stock.ticker.includes(searchQuery) || stock.companyName.includes(searchQuery);
  });

  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Screener Results Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBar onSearch={handleSearch} />
          <StockFilters onChange={handleFilterChange} />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Selected Filters</h3>
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
