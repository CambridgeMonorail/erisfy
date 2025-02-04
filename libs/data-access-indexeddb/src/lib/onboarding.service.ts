import { db } from './db.service';
import { Onboarding } from './types/onboarding';

export class OnboardingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OnboardingError';
  }
}

/**
 * Set or update onboarding data for a specific user.
 * If an entry already exists for this userId, Dexie will update it (because we're using 'put').
 */
export async function setOnboardingData(onboarding: Omit<Onboarding, 'id'>): Promise<number> {
  try {
    const existing = await getOnboardingData(onboarding.userId);
    if (existing) {
      return db.onboarding.put({ ...existing, ...onboarding });
    }
    return db.onboarding.put(onboarding);
  } catch (error) {
    if (error instanceof Error) {
      throw new OnboardingError(`Failed to set onboarding data: ${error.message}`);
    } else {
      throw new OnboardingError('Failed to set onboarding data: Unknown error');
    }
  }
}

/**
 * Retrieve onboarding data by userId.
 */
export async function getOnboardingData(userId: string): Promise<Onboarding | undefined> {
  // Use Dexie queries to filter by userId index
  return db.onboarding.where('userId').equals(userId).first();
}

/**
 * Check if the user has viewed onboarding (shortcut method).
 */
export async function hasViewedOnboarding(userId: string): Promise<boolean> {
  const onboarding = await getOnboardingData(userId);
  return !!onboarding?.hasViewed;
}

/**
 * Delete a user's onboarding record. (Useful for resets or testing)
 */
export async function deleteOnboardingData(userId: string): Promise<void> {
  // If you have a unique constraint on userId, you'd first get the record's id
  const onboarding = await getOnboardingData(userId);
  if (onboarding?.id != null) {
    await db.onboarding.delete(onboarding.id);
  }
}
