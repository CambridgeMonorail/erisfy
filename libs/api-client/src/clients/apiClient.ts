
import { ApiClient } from '../lib/api-client.interface';
import { RealAPIClient } from '../lib/real-api-client';
import { MockAPIClient } from './mockApiClient';


const isMock = import.meta.env.VITE_REACT_APP_USE_MOCKS === 'true';

const apiClient: ApiClient = isMock
  ? new MockAPIClient()
  : new RealAPIClient();

export default apiClient;
