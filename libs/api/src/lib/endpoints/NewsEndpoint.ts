import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/ApiResponse';
import { NewsArticle } from '../types/NewsArticle';

export class NewsEndpoint extends BaseApiClient {
  async getLatestNews(): Promise<ApiResponse<NewsArticle[]>> {
    return this.get<NewsArticle[]>('/news/latest');
  }

  async triggerNewsUpdate(): Promise<ApiResponse<{ message: string }>> {
    return this.get('/news/trigger');
  }
}
