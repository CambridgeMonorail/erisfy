import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TavilyService } from './tavily.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { TavilyApiException } from './exceptions/tavily-api.exception';

describe('TavilyService', () => {
  let service: TavilyService;
  let configService: ConfigService;
  let mockFetch: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TavilyService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'TAVILY_API_KEY') {
                return 'test-api-key';
              }
              if (key === 'TAVILY_API_BASE_URL') {
                return 'https://api.tavily.com/v1';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TavilyService>(TavilyService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock the global fetch function
    mockFetch = jest.spyOn(global, 'fetch').mockImplementation();
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should send a search request to the Tavily API with correct parameters', async () => {
      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'test-id',
          query: 'today financial market headlines',
          results: [
            {
              url: 'https://example.com/news/1',
              title: 'Today\'s Market Update',
              content: 'Financial markets are experiencing volatility...'
            }
          ],
        }),
      } as Response);

      const searchParams: SearchRequestDto = {
        query: 'today financial market headlines',
      };

      const result = await service.search(searchParams);

      // Verify fetch was called with correct parameters
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.tavily.com/v1/search',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...searchParams,
            api_key: 'test-api-key',
          }),
        })
      );

      // Verify the result
      expect(result).toEqual({
        id: 'test-id',
        query: 'today financial market headlines',
        results: [
          {
            url: 'https://example.com/news/1',
            title: 'Today\'s Market Update',
            content: 'Financial markets are experiencing volatility...',
          },
        ],
      });
    });

    it('should use default query if none is provided', async () => {
      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'test-id',
          query: 'today financial market headlines',
          results: [],
        }),
      } as Response);

      // Call without providing a query
      const result = await service.search({} as SearchRequestDto);

      // Verify the default query was used
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('today financial market headlines'),
        })
      );
    });

    it('should throw TavilyApiException when API returns non-OK response', async () => {
      // Mock failed API response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: async () => 'Invalid API key',
      } as Response);

      const searchParams: SearchRequestDto = {
        query: 'test query',
      };

      await expect(service.search(searchParams)).rejects.toThrow(TavilyApiException);
    });

    it('should throw InternalServerErrorException when fetch fails', async () => {
      // Mock a network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const searchParams: SearchRequestDto = {
        query: 'test query',
      };

      await expect(service.search(searchParams)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
