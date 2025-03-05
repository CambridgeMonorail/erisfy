import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StockDataController } from './stock-data.controller';
import { StockDataService } from '../services/stock-data.service';
import { NewsAnalysisState } from '../../news-analysis/interfaces/news-analysis-state.interface';

describe('StockDataController', () => {
  let controller: StockDataController;
  let service: StockDataService;

  const mockStockDataService = {
    fetchStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockDataController],
      providers: [
        {
          provide: StockDataService,
          useValue: mockStockDataService,
        },
      ],
    }).compile();

    controller = module.get<StockDataController>(StockDataController);
    service = module.get<StockDataService>(StockDataService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStockData', () => {
    it('should return stock data for a valid ticker', async () => {
      const mockStockData = {
        price: 150.45,
        volume: 5000000,
        marketCap: '2.5T',
        dayChange: 1.25
      };

      mockStockDataService.fetchStock.mockResolvedValueOnce({
        query: 'AAPL',
        ticker: 'AAPL',
        stockInfo: mockStockData
      });

      const result = await controller.getStockData('AAPL');

      expect(service.fetchStock).toHaveBeenCalledWith({
        query: 'AAPL',
        ticker: 'AAPL'
      });
      expect(result).toEqual(mockStockData);
    });

    it('should throw NotFoundException when the service returns an error', async () => {
      mockStockDataService.fetchStock.mockResolvedValueOnce({
        query: 'INVALID',
        ticker: 'INVALID',
        stockInfo: { error: 'Financial Datasets API call failed.' }
      });

      await expect(controller.getStockData('INVALID')).rejects.toThrow(NotFoundException);
      expect(service.fetchStock).toHaveBeenCalled();
    });
  });

  describe('searchStockData', () => {
    it('should return stock data when a ticker is found in the query', async () => {
      const mockStockData = {
        price: 200.10,
        volume: 3000000,
        marketCap: '1.8T',
        dayChange: -0.75
      };

      mockStockDataService.fetchStock.mockResolvedValueOnce({
        query: 'What is the current price of MSFT?',
        analysis: 'What is the current price of MSFT?',
        stockInfo: mockStockData
      });

      const result = await controller.searchStockData('What is the current price of MSFT?');

      expect(service.fetchStock).toHaveBeenCalledWith({
        query: 'What is the current price of MSFT?',
        analysis: 'What is the current price of MSFT?'
      });
      expect(result).toEqual(mockStockData);
    });

    it('should throw NotFoundException when no ticker is found', async () => {
      mockStockDataService.fetchStock.mockResolvedValueOnce({
        query: 'What are the best stocks today?',
        analysis: 'What are the best stocks today?',
        stockInfo: { error: 'No ticker identified.' }
      });

      await expect(controller.searchStockData('What are the best stocks today?')).rejects.toThrow(NotFoundException);
      expect(service.fetchStock).toHaveBeenCalled();
    });
  });
});
