// libs/mocks/src/handlers/users.ts
import { http } from 'msw';
import { createUser } from '../factories';

export const userHandlers = [
  http.get('/api/users', () => {
    const users = Array.from({ length: 10 }).map(() => createUser());
    return Response.json(users);
  }),
  // Add more user-related endpoints here...
];
