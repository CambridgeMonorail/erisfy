import { createAxiosInstance } from '@erisfy/api';

const axiosInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
});

export default axiosInstance;
