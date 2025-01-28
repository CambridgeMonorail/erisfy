import { FC, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Select, Checkbox, Slider, Pagination } from '@erisfy/shadcnui';
import { StockTable } from '../../components/StockTable';
import { StockFilters } from '../../components/StockFilters';
import { SearchBar } from '../../components/SearchBar';
import { generateMockData } from '../../utils/mockData';

const StockScreenerPage: FC = () => {
  const [stocks, setStocks] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const filteredStocks = stocks.filter((stock) => {
    // Apply filters to the stock data
    return true; // Placeholder for filter logic
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
            Stock Screener Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBar />
          <StockFilters onChange={handleFilterChange} />
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

export { StockScreenerPage };
