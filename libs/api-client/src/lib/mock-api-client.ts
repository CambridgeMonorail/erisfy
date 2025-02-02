import { IMyAPIClient } from './api-client.interface';

export class MockAPIClient implements IMyAPIClient {
  async getResource(id: string) {
    return Promise.resolve({
      id,
      name: `Mock Resource ${id}`,
      description: 'This is a mocked resource.',
    });
  }
}
