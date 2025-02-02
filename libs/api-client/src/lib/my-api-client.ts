import { createAxiosInstance } from './axios-instance';

const myAPIConfig = {
  baseURL: process.env.REACT_APP_MY_API_BASE_URL || 'http://localhost:3001/api',
  apiKey: process.env.REACT_APP_MY_API_KEY,
};

const myAPIClient = createAxiosInstance(myAPIConfig);

export const getResource = async (id: string) => {
  const response = await myAPIClient.get(`/resource/${id}`);
  return response.data;
};
