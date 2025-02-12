import { Onboarding } from '@erisfy/api';

class MockStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MockStorageError';
  }
}

const mockOnboardingStorage = new Map<string, Onboarding>();

export async function setMockOnboardingData(
  onboarding: Omit<Onboarding, 'id'>
): Promise<number> {
  try {
    const existing = await getMockOnboardingData(onboarding.userId);
    const id = existing?.id ?? Date.now();
    const data: Onboarding = { ...onboarding, id };

    mockOnboardingStorage.set(onboarding.userId, data);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      throw new MockStorageError(`Failed to set mock onboarding data: ${error.message}`);
    }
    throw new MockStorageError('Failed to set mock onboarding data: Unknown error');
  }
}

export async function getMockOnboardingData(
  userId: string
): Promise<Onboarding | undefined> {
  return mockOnboardingStorage.get(userId);
}

export async function hasMockViewedOnboarding(userId: string): Promise<boolean> {
  const onboarding = await getMockOnboardingData(userId);
  return !!onboarding?.hasViewed;
}

export async function deleteMockOnboardingData(userId: string): Promise<void> {
  mockOnboardingStorage.delete(userId);
}