import { BaseApiClient } from '../base/api.client';
import type { ApiConfig, User } from '../types/api.types';

export class UsersEndpoint {
  constructor(private readonly client: BaseApiClient) {}

  async getUsers(): Promise<User[]> {
    const response = await this.client.get<User[]>('/users');
    return response.data;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await this.client.post<User>('/users', userData);
    return response.data;
  }
}
