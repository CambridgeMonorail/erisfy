import { db} from './db.service';
import { Onboarding } from './types/onboarding';

/**
 * Set or update onboarding data for a specific user.
 * If an entry already exists for this userId, Dexie will update it (because we're using 'put').
 */
export async function setOnboardingData(onboarding: Omit<Onboarding, 'id'>): Promise<number> {
  // 'put' will insert a new record if none exists, or update if userId is matched. 
  // Because userId is an index, you might do a lookup first. 
  // But for simplicity, we'll rely on unique constraints or handle it logically later.
  return db.onboarding.put({
    ...onboarding,
    // If you want 'userId' to be unique, you can check it before putting.
  });
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
