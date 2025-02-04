import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from './db.service';
import { addItem, getItem, updateItem, deleteItem, getAllItems } from './item.service';

describe('Item Service', () => {
  beforeEach(async () => {
    await db.items.clear();
  });

  afterEach(async () => {
    await db.items.clear();
  });

  it('should add an item', async () => {
    const item = { name: 'Test Item', description: 'Test Description' };
    const id = await addItem(item);
    expect(id).toBeDefined();
    const savedItem = await getItem(id);
    expect(savedItem).toEqual({ ...item, id });
  });

  it('should get an item by id', async () => {
    const item = { name: 'Test Item', description: 'Test Description' };
    const id = await addItem(item);
    const retrievedItem = await getItem(id);
    expect(retrievedItem).toEqual({ ...item, id });
  });

  it('should update an item', async () => {
    const item = { name: 'Test Item', description: 'Test Description' };
    const id = await addItem(item);
    const updatedItem = { id, name: 'Updated Item', description: 'Updated Description' };
    
    await updateItem(updatedItem);
    const retrievedItem = await getItem(id);
    expect(retrievedItem).toEqual(updatedItem);
  });

  it('should throw error when updating item without id', async () => {
    const item = { name: 'Test Item', description: 'Test Description' };
    await expect(updateItem(item as any)).rejects.toThrow('Cannot update an item without an ID.');
  });

  it('should delete an item', async () => {
    const item = { name: 'Test Item', description: 'Test Description' };
    const id = await addItem(item);
    await deleteItem(id);
    const retrievedItem = await getItem(id);
    expect(retrievedItem).toBeUndefined();
  });

  it('should get all items', async () => {
    const items = [
      { name: 'Item 1', description: 'Description 1' },
      { name: 'Item 2', description: 'Description 2' },
    ];

    for (const item of items) {
      await addItem(item);
    }

    const allItems = await getAllItems();
    expect(allItems).toHaveLength(2);
    expect(allItems[0].name).toBe('Item 1');
    expect(allItems[1].name).toBe('Item 2');
  });

  it('should handle empty items list', async () => {
    const items = await getAllItems();
    expect(items).toEqual([]);
  });

  it('should handle non-existent item retrieval', async () => {
    const item = await getItem(999);
    expect(item).toBeUndefined();
  });

  it('should maintain data integrity with concurrent operations', async () => {
    const operations = Array(5).fill(null).map(() => 
      addItem({ name: 'Concurrent Item', description: 'Test' })
    );
    const ids = await Promise.all(operations);
    expect(new Set(ids).size).toBe(5);
  });

  it('should throw an error when adding an item without a name', async () => {
    await expect(addItem({ description: 'No name provided' } as any)).rejects.toThrow();
  });

  it('should maintain data integrity under higher concurrency', async () => {
    const operations = Array(10).fill(null).map(() =>
      addItem({ name: 'Concurrent Item', description: 'Test' })
    );
    const ids = await Promise.all(operations);
    expect(new Set(ids).size).toBe(10);
  });
});
