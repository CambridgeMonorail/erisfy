import { Test, TestingModule } from '@nestjs/testing';
import { TavilyController } from './tavily.controller';
import { TavilyService } from './tavily.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { SearchResponseDto } from './dto/search-response.dto';

describe('TavilyController', () => {
  let controller: TavilyController;
  let service: TavilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TavilyController],
      providers: [
        {
          provide: TavilyService,
          useValue: {
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TavilyController>(TavilyController);
    service = module.get<TavilyService>(TavilyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should call the service with the provided search parameters', async () => {
      // Mock data
      const searchRequestDto: SearchRequestDto = {
        query: 'today financial market headlines',
      };

      const mockResponse: SearchResponseDto = {
        id: 'test-id',
        query: 'today financial market headlines',
        results: [
          {
            url: 'https://example.com/news/1',
            title: 'Market Update',
            content: 'Financial markets are experiencing volatility...',
          },
        ],
      };

      // Mock the service response
      jest.spyOn(service, 'search').mockResolvedValue(mockResponse);

      // Call the controller method
      const result = await controller.search(searchRequestDto);

      // Assert service was called correctly
      expect(service.search).toHaveBeenCalledWith(searchRequestDto);

      // Assert the controller returns the service response
      expect(result).toEqual(mockResponse);
    });
  });
});
