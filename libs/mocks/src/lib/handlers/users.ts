// libs/mocks/src/handlers/users.ts
import { http, HttpResponse } from 'msw';
import { createUser } from '../factories';

// Use consistent API base URL across all handlers
const API_BASE_URL = 'https://api.erisfy.com';

export const userHandlers = [
  http.get(`${API_BASE_URL}/api/users`, () => {
    const users = Array.from({ length: 10 }).map(() => createUser());
    return HttpResponse.json(users);
  }),
  // Add more user-related endpoints here...
];
