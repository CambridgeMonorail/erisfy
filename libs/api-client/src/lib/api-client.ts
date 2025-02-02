// libs/api-client/src/lib/apiClient.ts

import { ApiClient } from './api-client.interface';
import { RealAPIClient } from './real-api-client';
import { MockAPIClient } from './mock-api-client';

// Generic type parameter T can be specified when importing this client
const apiClient: ApiClient = 
  process.env.NODE_ENV === 'development' ? new MockAPIClient() : new RealAPIClient();

export default apiClient;