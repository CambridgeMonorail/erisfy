# Data Access IndexedDB Library

A typed IndexedDB wrapper library for Erisfy's client-side data persistence needs. This library provides a simple, Promise-based API for working with IndexedDB storage.

## Features

- Type-safe database operations
- Promise-based API
- Built-in error handling
- Automatic database versioning
- Support for complex queries
- Unit test coverage

## Quick Start

### Installation

```bash
pnpm add @erisfy/data-access-indexeddb
```

### Basic Usage

#### Working with Items

```typescript
import { addItem, getItem, updateItem, deleteItem } from '@erisfy/data-access-indexeddb';

// Add an item
const id = await addItem({ name: 'Example', description: 'Test item' });

// Get an item
const item = await getItem(id);

// Update an item
await updateItem({ id, name: 'Updated Example', description: 'Updated item' });

// Delete an item
await deleteItem(id);
```

#### Managing Onboarding Data

```typescript
import { 
  setOnboardingData, 
  getOnboardingData, 
  hasViewedOnboarding 
} from '@erisfy/data-access-indexeddb';

// Set onboarding data
await setOnboardingData({
  userId: 'user123',
  hasViewed: true,
  chosenOptions: ['option1', 'option2']
});

// Check onboarding status
const hasViewed = await hasViewedOnboarding('user123');
```

## Database Schema

### Items Table

```typescript
interface Item {
  id?: number;          // Primary key (auto-increment)
  name: string;         // Indexed field
  description?: string; // Optional field
}
```

### Onboarding Table

```typescript
interface Onboarding {
  id?: number;
  userId: string;           // Indexed field
  hasViewed: boolean;
  chosenOptions: string[];
}
```

## Developer Guide

### Adding a New Table

1. **Define the Type**

```typescript
// types/newEntity.ts
export interface NewEntity {
  id?: number;
  // ... other fields
}
```

2. **Update Database Schema**

```typescript
class AppDatabase extends Dexie {
  newEntities!: Table<NewEntity, number>;
  
  constructor() {
    super('erisfy');
    this.version(1).stores({
      newEntities: '++id, indexedField'
    });
  }
}
```

3. **Create Service Methods**

```typescript
// newEntity.service.ts
import { db } from './db.service';
import { NewEntity } from './types/newEntity';

export async function addNewEntity(entity: Omit<NewEntity, 'id'>): Promise<number> {
  return db.newEntities.add(entity);
}
```

### Running Tests

```bash
# Run all tests
nx test data-access-indexeddb

# Run tests in watch mode
nx test data-access-indexeddb --watch
```

## Best Practices

1. **Type Safety**
   - Always use TypeScript interfaces for table schemas
   - Maintain strict typing for all operations

2. **Error Handling**
   - Include comprehensive error handling in service methods
   - Use custom error types for specific failures

3. **Testing**
   - Write unit tests for all new functionality
   - Include edge cases and error scenarios

4. **Performance**
   - Use meaningful index fields
   - Consider pagination for large datasets

5. **Documentation**
   - Document new tables and methods
   - Include usage examples

## Limitations

- Browser storage quotas apply to IndexedDB
- Not suitable for sensitive data
- Performance impacts with large datasets

## Contributing

1. Create a feature branch
1. Add tests for new functionality
1. Update documentation
1. Submit a pull request

## License

Internal use only - Erisfy proprietary code
