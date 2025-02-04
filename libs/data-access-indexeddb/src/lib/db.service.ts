import Dexie, { Table } from 'dexie';

// 1) Define the shape of the data you want to store.
export interface Item {
  id?: number;          // Primary key (auto-increment)
  name: string;         // Indexed field
  description?: string; // Optional field
}

// 2) Extend Dexie to define your DB, tables, and version(s).
export class AppDatabase extends Dexie {
  public items!: Table<Item, number>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      items: '++id, name',
    });
  }
}

// 3) Export a singleton instance to use across your app.
export const db = new AppDatabase();
