import { ApiClient, ApiResponse } from './api-client.interface';
import axios from 'axios';

export class RealAPIClient implements ApiClient {
  private baseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

  async getResource(id: string): Promise<ApiResponse<unknown>> {
    const response = await axios.get(`${this.baseUrl}/resources/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<unknown[]>> {
    const response = await axios.get(`${this.baseUrl}/resources`, { params });
    return {
      data: response.data,
      status: response.status,
    };
  }

  async createResource(data: Partial<unknown>): Promise<ApiResponse<unknown>> {
    const response = await axios.post(`${this.baseUrl}/resources`, data);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async updateResource(id: string, data: Partial<unknown>): Promise<ApiResponse<unknown>> {
    const response = await axios.put(`${this.baseUrl}/resources/${id}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    const response = await axios.delete(`${this.baseUrl}/resources/${id}`);
    return {
      data: undefined,
      status: response.status,
    };
  }
}