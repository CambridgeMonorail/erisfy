import { http, HttpResponse } from 'msw';
import { Onboarding } from '@erisfy/api';
import { getMockOnboardingData, setMockOnboardingData } from '../storage/mock-storage.service';

const API_BASE_URL = '/erisfy';

export const onboardingHandlers = [
  http.get(`${API_BASE_URL}/api/onboardings`, async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return HttpResponse.json([], { status: 400 });
    }

    const onboarding = await getMockOnboardingData(userId);
    return HttpResponse.json(onboarding ? [onboarding] : []);
  }),

  http.post(`${API_BASE_URL}/api/onboardings`, async ({ request }) => {
    const data = await request.json() as Omit<Onboarding, 'id'>;
    await setMockOnboardingData(data);
    const savedData = await getMockOnboardingData(data.userId);
    return HttpResponse.json(savedData);
  }),

  http.patch(`${API_BASE_URL}/api/onboardings/:id`, async ({ request }) => {
    const updates = await request.json() as Partial<Onboarding>;
    const existingData = await getMockOnboardingData(updates.userId as string);

    if (!existingData) {
      return new HttpResponse(null, { status: 404 });
    }

    await setMockOnboardingData({ ...existingData, ...updates });
    const updatedData = await getMockOnboardingData(updates.userId as string);
    return HttpResponse.json(updatedData);
  })
];
