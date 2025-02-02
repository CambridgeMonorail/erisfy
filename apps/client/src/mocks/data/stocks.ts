import { faker } from '@faker-js/faker';
import { Stock } from '../../app/types/stock.types';

export const createMockStock = (id?: string): Stock => ({
  id: id ?? faker.string.uuid(),
  symbol: faker.word.noun().toUpperCase(),
  price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 })
});

export const mockStocks: Stock[] = Array.from({ length: 10 }, () => createMockStock());

export const getMockStockById = (id: string): Stock => ({
  ...createMockStock(),
  id
});
