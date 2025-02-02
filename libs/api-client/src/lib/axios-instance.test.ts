import { describe, it, expect, vi, MockInstance } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import { createAxiosInstance } from './axios-instance';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  create: MockInstance<typeof axios.create>;
};

describe('createAxiosInstance', () => {
  it('should create axios instance with base config', () => {
    mockedAxios.create.mockReturnValue({
      defaults: { headers: { common: {} } },
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      }
    } as unknown as AxiosInstance);

    const instance = createAxiosInstance({
      baseURL: 'http://test.com',
      apiKey: 'test-key'
    });

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://test.com',
      timeout: 10000
    });

    expect(instance.defaults.headers.common['Authorization']).toBe('Bearer test-key');
  });

  it('should create instance without API key when not provided', () => {
    mockedAxios.create.mockReturnValue({
      defaults: { headers: { common: {} } },
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      }
    } as unknown as AxiosInstance);

    const instance = createAxiosInstance({
      baseURL: 'http://test.com'
    });

    expect(instance.defaults.headers.common['Authorization']).toBeUndefined();
  });
});
