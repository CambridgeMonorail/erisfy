import { FC, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@erisfy/shadcnui';
import { StockFilters } from '../../components/StockFilters';
import { SearchBar } from '../../components/SearchBar';

const FilterSelectionScreen: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSelect = (filters: { sector: string; industry: string; country: string; marketCap: [number, number]; priceRange: [number, number] }) => {
    const filterArray = Object.entries(filters).map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
    setSelectedFilters(filterArray);
  };

  return (
    <TooltipProvider>
      <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold mb-2 text-primary">
              Filter Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SearchBar onSearch={handleSearch} />
            <Tabs defaultValue="fundamentals">
              <TabsList>
                <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                <TabsTrigger value="technicals">Technicals</TabsTrigger>
                <TabsTrigger value="ownership">Ownership</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="fundamentals">
                <StockFilters onChange={handleFilterSelect} />
              </TabsContent>
              <TabsContent value="technicals">
                <StockFilters onChange={handleFilterSelect} />
              </TabsContent>
              <TabsContent value="ownership">
                <StockFilters onChange={handleFilterSelect} />
              </TabsContent>
              <TabsContent value="performance">
                <StockFilters onChange={handleFilterSelect} />
              </TabsContent>
            </Tabs>
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
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export { FilterSelectionScreen };
