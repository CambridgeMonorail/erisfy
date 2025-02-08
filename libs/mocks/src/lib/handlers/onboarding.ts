import { http, HttpResponse } from 'msw';
import { Onboarding } from '@erisfy/api';
import { createOnboarding } from '../factories/onboarding';

const API_BASE_URL = import.meta.env['VITE_API_BASE_URL'];

export const onboardingHandlers = [
  http.get(`${API_BASE_URL}/api/onboardings`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    const onboardings = Array.from({ length: 5 }).map(() => 
      createOnboarding(userId ? { userId } : undefined)
    );

    if (userId) {
      return HttpResponse.json(onboardings.filter(o => o.userId === userId));
    }

    return HttpResponse.json(onboardings);
  }),

  http.post(`${API_BASE_URL}/api/onboardings`, async ({ request }) => {
    const data = await request.json() as Partial<Onboarding>;
    return HttpResponse.json(createOnboarding(data));
  }),

  http.patch(`${API_BASE_URL}/api/onboardings/:id`, async ({ params, request }) => {
    const data = await request.json() as Partial<Onboarding>;
    return HttpResponse.json(createOnboarding({ id: Number(params['id']), ...data }));
  })
];
