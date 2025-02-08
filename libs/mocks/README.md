# Mocks Library

This library provides mock API handlers using [MSW (Mock Service Worker)](https://mswjs.io/) for development and testing.

## Overview

The mocks library contains:

- Request handlers for simulating API endpoints
- Data factories for generating realistic test data
- Browser integration for development mocking

## Usage

### Starting the Mock Worker

```typescript
import { worker } from '@erisfy/mocks';

// Call this in your development entry point
await worker.start();
```

### Adding New Handlers

1. Create a new handler file in `src/lib/handlers/`:

```typescript
// src/lib/handlers/posts.ts
import { http } from 'msw';
import { createPost } from '../factories';

export const postHandlers = [
  http.get('/api/posts', () => {
    return Response.json(Array.from({ length: 5 }).map(() => createPost()));
  }),
];
```

2. Add the handlers to `src/lib/handlers/index.ts`:

```typescript
import { postHandlers } from './posts';

export const handlers = [
  ...userHandlers,
  ...postHandlers,
];
```

### Creating Data Factories

Add new factories in `src/lib/factories.ts`:

```typescript
export const createPost = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  authorId: faker.string.uuid(),
});
```

## Building

Run `nx build mocks` to build the library.

## Running unit tests

Run `nx test mocks` to execute the unit tests via [Vitest](https://vitest.dev/).
