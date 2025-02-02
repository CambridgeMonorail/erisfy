// libs/api-client/src/lib/apiClient.ts
import { IMyAPIClient } from './api-client.interface';
import { RealAPIClient } from './real-api-client';
import { MockAPIClient } from './mock-api-client';

const myApiClient: IMyAPIClient =
  process.env.NODE_ENV === 'development' ? new MockAPIClient() : new RealAPIClient();

export default myApiClient;