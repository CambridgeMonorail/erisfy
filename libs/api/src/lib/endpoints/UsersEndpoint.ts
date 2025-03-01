import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse, User } from '../types';


export class UsersEndpoint extends BaseApiClient {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.get<User[]>('/users');
  }

  async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return this.post<User>('/users', userData);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`/users/${id}`);
  }
}
