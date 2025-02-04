import { db, Item } from './db.service';

// Add a new item
export async function addItem(item: Omit<Item, 'id'>): Promise<number> {
  return db.items.add(item);
}

// Get a single item by ID
export async function getItem(id: number): Promise<Item | undefined> {
  return db.items.get(id);
}

// Update an existing item
export async function updateItem(item: Item): Promise<void> {
  if (item.id == null) {
    throw new Error('Cannot update an item without an ID.');
  }
  await db.items.put(item);
}

// Delete an item by ID
export async function deleteItem(id: number): Promise<void> {
  await db.items.delete(id);
}

// Get all items
export async function getAllItems(): Promise<Item[]> {
  return db.items.toArray();
}
