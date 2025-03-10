import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchRequestDto } from './dto/search-request.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { TavilyApiException } from './exceptions/tavily-api.exception';

/**
 * Service for interacting with the Tavily API
 */
@Injectable()
export class TavilyService {
  private readonly logger = new Logger(TavilyService.name);
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('TAVILY_API_KEY');
    const baseUrl = this.configService.get<string>('TAVILY_API_BASE_URL') || 'https://api.tavily.com';
    this.apiUrl = `${baseUrl}/search`;  // Remove /v1 from the path

    if (!this.apiKey) {
      this.logger.error('TAVILY_API_KEY is not configured');
    }
  }

  /**
   * Send a search query to the Tavily API
   *
   * @param searchParams The search parameters
   * @returns The search results
   */
  async search(searchParams: SearchRequestDto): Promise<SearchResponseDto> {
    try {
      // Set default query if not provided
      if (!searchParams.query) {
        searchParams.query = 'today financial market headlines';
      }

      // Create payload with CNBC finance domain excluded
      const payload = {
        ...searchParams,
        exclude_domains: [
          ...(searchParams.exclude_domains || []),
          'www.cnbc.com/finance'
        ]
      };

      this.logger.log(`Sending search request to Tavily API: ${payload.query}`);

      // Send the request to Tavily API with Bearer token authentication
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `Tavily API error (${response.status}): ${errorText}`,
        );
        throw new TavilyApiException(
          `Tavily API error: ${response.statusText}`,
          response.status
        );
      }

      // Parse and return the response
      const data: SearchResponseDto = await response.json();
      this.logger.log(`Successfully retrieved ${data.results?.length || 0} results from Tavily API`);

      return data;
    } catch (error) {
      if (error instanceof TavilyApiException) {
        throw error;
      }

      this.logger.error('Error searching Tavily API', error instanceof Error ? error.message : String(error));
      throw new InternalServerErrorException('Failed to search Tavily API');
    }
  }
}
