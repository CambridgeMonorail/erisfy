import Dexie, { Table } from 'dexie';
import { Item } from './types/item';
import { Onboarding } from './types/onboarding';

// 2) Extend Dexie to define your DB, tables, and version(s).
export class AppDatabase extends Dexie {
  public items!: Table<Item, number>;
  public onboarding!: Table<Onboarding, number>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      items: '++id, name',
      onboarding: '++id, userId',
    });
  }
}

// 3) Export a singleton instance to use across your app.
export const db = new AppDatabase();
