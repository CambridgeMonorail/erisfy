import { http, HttpResponse } from 'msw';
import { Onboarding } from '@erisfy/api';
import {
  getOnboardingData,
  setOnboardingData,
  OnboardingError
} from '@erisfy/data-access-indexeddb';

const API_BASE_URL = '/erisfy';

export const onboardingHandlers = [
  http.get(`${API_BASE_URL}/api/onboardings`, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');

      if (!userId) {
        return HttpResponse.json({ error: 'userId is required' }, { status: 400 });
      }

      const onboarding = await getOnboardingData(userId);
      return HttpResponse.json(onboarding ? [onboarding] : []);
    } catch (error) {
      if (error instanceof OnboardingError) {
        return HttpResponse.json({ error: error.message }, { status: 500 });
      }
      return HttpResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }),

  http.post(`${API_BASE_URL}/api/onboardings`, async ({ request }) => {
    try {
      console.log('[MSW] Handling POST request');
      const data = await request.json() as Omit<Onboarding, 'id'>;
      console.log('[MSW] Create payload:', data);
      
      await setOnboardingData({ ...data, id: 1 }); // Add an ID for new records
      const savedData = await getOnboardingData(data.userId);
      console.log('[MSW] Created data:', savedData);
      return HttpResponse.json(savedData);
    } catch (error) {
      console.error('[MSW] Error handling POST request:', error);
      if (error instanceof OnboardingError) {
        return HttpResponse.json({ error: error.message }, { status: 500 });
      }
      return HttpResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }),

  http.patch(`${API_BASE_URL}/api/onboardings/*`, async ({ request }) => {
    try {
      console.log('[MSW] Handling PATCH request:', request.url);
      const updates = await request.json() as Partial<Onboarding>;
      console.log('[MSW] Update payload:', updates);
      
      if (!updates.userId) {
        return HttpResponse.json(
          { error: 'userId is required' },
          { status: 400 }
        );
      }

      let existingData = await getOnboardingData(updates.userId);
      
      // If no existing data, create new record
      if (!existingData) {
        console.log('[MSW] Creating new record for userId:', updates.userId);
        await setOnboardingData({ 
          id: 1,
          userId: updates.userId,
          hasViewed: false,
          chosenOptions: [],
          ...updates 
        });
        existingData = await getOnboardingData(updates.userId);
      }

      // Update existing record
      await setOnboardingData({ ...existingData, ...updates });
      const updatedData = await getOnboardingData(updates.userId);
      console.log('[MSW] Successfully updated data:', updatedData);
      return HttpResponse.json(updatedData);
    } catch (error) {
      console.error('[MSW] Error handling PATCH request:', error);
      if (error instanceof OnboardingError) {
        return HttpResponse.json({ error: error.message }, { status: 500 });
      }
      return HttpResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  })
];
