import Dexie, { Table } from 'dexie';
import { Item } from './types/item';
import { Onboarding } from './types/onboarding';

// 2) Extend Dexie to define your DB, tables, and version(s).
export class AppDatabase extends Dexie {
  // Define table types more strictly
  public items!: Table<Item>;
  public onboarding!: Table<Onboarding>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      items: '++id, name, &[name]', // Add unique constraint on name
      onboarding: '++id, &userId',  // Add unique constraint on userId
    });
  }
}

// 3) Export a singleton instance to use across your app.
export const db = new AppDatabase();
