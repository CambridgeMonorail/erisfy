import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { StockDataService } from './stock-data.service';
import { NewsAnalysisState } from '../../news-analysis/interfaces/news-analysis-state.interface';

describe('StockDataService', () => {
  let service: StockDataService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockDataService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockImplementation((key: string) => {
              if (key === 'FINNHUB_API_KEY') return 'test-api-key';
              throw new Error(`Config key not found: ${key}`);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<StockDataService>(StockDataService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchStock', () => {
    let mockFetch: jest.SpyInstance;

    beforeEach(() => {
      mockFetch = jest.spyOn(global, 'fetch').mockImplementation();
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

    it('should initialize with API key from config service', async () => {
      expect(configService.getOrThrow).toHaveBeenCalledWith('FINNHUB_API_KEY');
    });

    it('should return state with error when no ticker is provided or extracted', async () => {
      const state: NewsAnalysisState = {
        query: 'market news',
      };

      const result = await service.fetchStock(state);

      expect(result.stockInfo).toBeDefined();
      expect(result.stockInfo.error).toBe('No ticker identified.');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should extract ticker from analysis text if not provided directly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ price: 150.00, volume: 1000000 }),
      } as unknown as Response);

      const state: NewsAnalysisState = {
        query: 'market news',
        analysis: 'AAPL stock is performing well this quarter.',
      };

      const result = await service.fetchStock(state);

      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch.mock.calls[0][0]).toContain('ticker=AAPL');
      expect(result.stockInfo).toBeDefined();
      expect(result.stockInfo.price).toBe(150.00);
    });

    it('should use provided ticker over extracted one', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ price: 200.00, volume: 2000000 }),
      } as unknown as Response);

      const state: NewsAnalysisState = {
        query: 'market news',
        ticker: 'MSFT',
        analysis: 'AAPL stock is performing well this quarter.',
      };

      const result = await service.fetchStock(state);

      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch.mock.calls[0][0]).toContain('ticker=MSFT');
      expect(result.stockInfo).toBeDefined();
      expect(result.stockInfo.price).toBe(200.00);
    });

    it('should handle API errors correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: jest.fn().mockResolvedValue('Unauthorized'),
      } as unknown as Response);

      const state: NewsAnalysisState = {
        query: 'market news',
        ticker: 'MSFT',
      };

      const result = await service.fetchStock(state);

      expect(result.stockInfo).toBeDefined();
      expect(result.stockInfo.error).toBe('Financial Datasets API call failed.');
      expect(result.stockInfo.ticker).toBe('MSFT');
    });

    it('should handle network failures', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      const state: NewsAnalysisState = {
        query: 'market news',
        ticker: 'MSFT',
      };

      const result = await service.fetchStock(state);

      expect(result.stockInfo).toBeDefined();
      expect(result.stockInfo.error).toBe('Financial Datasets API call failed.');
      expect(result.stockInfo.details).toBe('Network failure');
    });
  });
});
