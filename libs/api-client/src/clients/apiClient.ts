import { ApiClient } from '../types';
import { MockAPIClient } from './mockApiClient';
import { RealAPIClient } from './realApiClient';

const isMock = import.meta.env.VITE_REACT_APP_USE_MOCKS === 'true';

const apiClient: ApiClient = isMock
  ? new MockAPIClient()
  : new RealAPIClient();

export default apiClient;
