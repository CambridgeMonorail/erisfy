import { Stock } from '@erisfy/shared/types';
import { faker } from '@faker-js/faker';

export const createMockStock = (id?: string): Stock => ({
  id: id ?? faker.string.uuid(),
  symbol: faker.finance.stockSymbol(),
  price: parseFloat(faker.finance.amount(10, 1000, 2))
});

export const mockStocks: Stock[] = Array.from({ length: 10 }, () => createMockStock());

export const getMockStockById = (id: string): Stock => ({
  ...createMockStock(),
  id
});
