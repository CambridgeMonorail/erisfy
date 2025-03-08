import { Body, Controller, Post, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { TavilyService } from './tavily.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { SearchResponseDto } from './dto/search-response.dto';

/**
 * Controller for handling Tavily API search requests
 * Exposes endpoints for searching financial market information
 */
@ApiTags('Tavily')
@Controller('tavily')
export class TavilyController {
  private readonly logger = new Logger(TavilyController.name);

  constructor(private readonly tavilyService: TavilyService) {}

  /**
   * Endpoint to search for financial market information using Tavily API
   *
   * @param searchRequestDto The search request data
   * @returns The search results from Tavily API
   */
  @Post('search')
  @ApiOperation({
    summary: 'Search for financial information',
    description: 'Uses Tavily API to search for financial news, market data, and analysis based on the provided query'
  })
  @ApiBody({ type: SearchRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
    schema: { $ref: '#/components/schemas/SearchResponseDto' }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid search parameters'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error or Tavily API error'
  })
  async search(@Body() searchRequestDto: SearchRequestDto): Promise<SearchResponseDto> {
    this.logger.log(`Processing search request: ${searchRequestDto.query}`);
    return this.tavilyService.search(searchRequestDto);
  }
}
