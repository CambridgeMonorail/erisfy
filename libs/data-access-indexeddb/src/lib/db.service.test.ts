import { describe, it, expect, beforeEach } from 'vitest';
import { AppDatabase, db } from './db.service';

describe('AppDatabase', () => {
  it('should be an instance of AppDatabase', () => {
    expect(db).toBeInstanceOf(AppDatabase);
  });

  it('should have items table defined', () => {
    expect(db.items).toBeDefined();
  });

  it('should have correct schema version', () => {
    expect(db.verno).toBe(1);
  });
});
