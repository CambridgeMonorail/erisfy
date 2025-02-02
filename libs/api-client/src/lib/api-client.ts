import { ApiClient } from './api-client.interface';
import { RealAPIClient } from './real-api-client';
import { MockAPIClient } from './mock-api-client';

const isMock = process.env.REACT_APP_USE_MOCKS === 'true';

const apiClient: ApiClient = isMock
  ? new MockAPIClient()
  : new RealAPIClient();

export default apiClient;
