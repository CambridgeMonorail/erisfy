import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import { NewsItem } from '../types/newsItem';
import { MarketNewsRecord } from '../types/marketNews';

export class NewsEndpoint extends BaseApiClient {
  async getGeneral(): Promise<ApiResponse<NewsItem[]>> {
    return this.get<NewsItem[]>('/news/general');
  }

  async getMarket(): Promise<ApiResponse<NewsItem[]>> {
    const response = await this.get<MarketNewsRecord>('/market-insights/latest');

    if (!response.data) {
      return { data: [], status: response.status, message: response.message };
    }

    // Transform MarketNewsStory[] into NewsItem[]
    const news: NewsItem[] = response.data.stories.map(story => ({
      id: story.id,
      title: story.title,
      summary: story.one_line_summary,
      relevance: [story.market_sector],
      publishedAt: response.data.createdAt // Use the parent record's createdAt as publishedAt
    }));

    return {
      data: news,
      status: response.status,
      message: response.message
    };
  }

  async triggerNewsUpdate(): Promise<ApiResponse<void>> {
    return this.get<void>('/news/trigger');
  }
}
