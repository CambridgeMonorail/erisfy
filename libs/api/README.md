# Erisfy API Library

A strongly-typed API client library for Erisfy applications, providing type-safe HTTP communication with the backend services.

## Features

- Type-safe API client implementations
- Centralized error handling with custom `ApiError` class
- Axios-based HTTP client with interceptors
- Modular endpoint architecture
- Configurable base client

## Installation

This library is part of the Erisfy monorepo and is installed by default. If needed, you can rebuild it using:

```bash
nx build api
```

## Usage

### Basic Setup

1. Import and configure the API client:

```typescript
import { ApiConfig, UsersEndpoint } from "@erisfy/api";

const config: ApiConfig = {
  baseURL: 'http://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
};

const usersApi = new UsersEndpoint(config);
```

### Making API Calls

```typescript
// Get all users
try {
  const response = await usersApi.getUsers();
  console.log(response.data); // Array of User objects
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error: ${error.message}`);
  }
}

// Create a new user
try {
  const newUser = await usersApi.createUser({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg"
  });
  console.log(newUser.data); // Created User object
} catch (error) {
  // Handle error
}
```

## API Reference

### Types

```typescript
type ApiConfig = {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
};

type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};
```

### Available Endpoints

#### UsersEndpoint

- `getUsers()`: Fetch all users
- `getUserById(id: string)`: Fetch a specific user
- `createUser(userData: Omit<User, 'id'>)`: Create a new user

## Error Handling

The library provides a custom `ApiError` class for error handling:

```typescript
try {
  await usersApi.getUsers();
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status); // HTTP status code
    console.log(error.message); // Error message
    console.log(error.data); // Additional error data
  }
}
```

## Testing

Run the test suite using:

```bash
nx test api
```

## Contributing

1. Follow the TypeScript strict mode guidelines
2. Maintain type safety across the codebase
3. Add tests for new features
4. Update documentation as needed

## License

Internal use only - Erisfy
