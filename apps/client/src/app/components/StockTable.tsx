import { FC, useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@erisfy/shadcnui';
import { StockData } from '../utils/mockData';


interface StockTableProps {
  stocks: StockData[];
}

const StockTable: FC<StockTableProps> = ({ stocks }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof StockData; direction: 'ascending' | 'descending' } | null>(null);

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof StockData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell onClick={() => requestSort('ticker')}>Ticker</TableCell>
          <TableCell onClick={() => requestSort('companyName')}>Company Name</TableCell>
          <TableCell onClick={() => requestSort('sector')}>Sector</TableCell>
          <TableCell onClick={() => requestSort('industry')}>Industry</TableCell>
          <TableCell onClick={() => requestSort('country')}>Country</TableCell>
          <TableCell onClick={() => requestSort('marketCap')}>Market Cap</TableCell>
          <TableCell onClick={() => requestSort('currentPrice')}>Current Price</TableCell>
          <TableCell onClick={() => requestSort('priceChange')}>Price Change</TableCell>
          <TableCell onClick={() => requestSort('priceChangePercentage')}>Price Change %</TableCell>
          <TableCell onClick={() => requestSort('volume')}>Volume</TableCell>
          <TableCell onClick={() => requestSort('week52High')}>52-Week High</TableCell>
          <TableCell onClick={() => requestSort('week52Low')}>52-Week Low</TableCell>
          <TableCell onClick={() => requestSort('dividendYield')}>Dividend Yield</TableCell>
          <TableCell onClick={() => requestSort('peRatio')}>P/E Ratio</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedStocks.map((stock) => (
          <TableRow key={stock.ticker}>
            <TableCell>{stock.ticker}</TableCell>
            <TableCell>{stock.companyName}</TableCell>
            <TableCell>{stock.sector}</TableCell>
            <TableCell>{stock.industry}</TableCell>
            <TableCell>{stock.country}</TableCell>
            <TableCell>{stock.marketCap}</TableCell>
            <TableCell>{stock.currentPrice}</TableCell>
            <TableCell className={stock.priceChange > 0 ? 'text-green-500' : 'text-red-500'}>
              {stock.priceChange}
            </TableCell>
            <TableCell className={stock.priceChangePercentage > 0 ? 'text-green-500' : 'text-red-500'}>
              {stock.priceChangePercentage}%
            </TableCell>
            <TableCell>{stock.volume}</TableCell>
            <TableCell>{stock.week52High}</TableCell>
            <TableCell>{stock.week52Low}</TableCell>
            <TableCell>{stock.dividendYield}</TableCell>
            <TableCell>{stock.peRatio}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { StockTable };
