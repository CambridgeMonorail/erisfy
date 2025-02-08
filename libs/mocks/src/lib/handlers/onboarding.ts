import { http } from 'msw';
import { Onboarding } from '@erisfy/api';
import { createOnboarding } from '../factories/onboarding';

const API_BASE_URL = import.meta.env['VITE_API_BASE_URL'];

export const onboardingHandlers = [

  console.log('API_BASE_URL', API_BASE_URL),

  http.get('/api/onboardings', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    const onboardings = Array.from({ length: 5 }).map(() => 
      createOnboarding(userId ? { userId } : undefined)
    );

    if (userId) {
      return Response.json(onboardings.filter(o => o.userId === userId));
    }

    return Response.json(onboardings);
  }),

  http.post('/api/onboardings', async ({ request }) => {
    const data = await request.json() as Partial<Onboarding>;
    return Response.json(createOnboarding(data));
  }),

  http.patch('/api/onboardings/:id', async ({ params, request }) => {
    const data = await request.json() as Partial<Onboarding>;
    return Response.json(createOnboarding({ id: Number(params['id']), ...data }));
  })
];
