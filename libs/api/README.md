# Erisfy API Library

A strongly-typed API client library for Erisfy applications, providing type-safe HTTP communication with the backend services.

## Features

- Strongly-typed API endpoints extending BaseApiClient
- Centralized error handling with custom `ApiError` class
- Axios-based HTTP client with interceptors
- Automatic response formatting with ApiResponse type
- Configurable request timeouts and headers

## Installation

This library is part of the Erisfy monorepo. To build the library:

```bash
nx build api
```

## Architecture

The library is structured around a base client class that handles common HTTP operations:

- `BaseApiClient`: Core abstract class providing HTTP methods and error handling
- Endpoint classes (like `UsersEndpoint`) extend BaseApiClient for specific API resources
- `ApiError` class for standardized error handling
- Type definitions for responses and configurations

## Usage

### Basic Setup

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
  const { data: users, status } = await usersApi.getUsers();
  console.log(users); // Array of User objects
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error (${error.status}): ${error.message}`);
    // Access additional error data if available
    console.error(error.data);
  }
}

// Create a new user
try {
  const { data: newUser } = await usersApi.createUser({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg"
  });
  console.log(newUser); // Created User object
} catch (error) {
  // Handle error
}
```

## Error Handling

The library uses the `ApiError` class for standardized error handling:

```typescript
try {
  const response = await usersApi.getUsers();
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Handle unauthorized
        break;
      case 404:
        // Handle not found
        break;
      default:
        // Handle other errors
        console.error(`${error.message} (${error.status})`);
    }
  }
}
```

## Available Endpoints

### UsersEndpoint

Methods for managing user resources:

```typescript
getUsers(): Promise<ApiResponse<User[]>>
getUserById(id: string): Promise<ApiResponse<User>>
createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>>
```

## Testing

Run the test suite:

```bash
nx test api
```

For development with mock data:

```bash
nx test api --watch
```

## Contributing

1. Follow TypeScript strict mode and project conventions
2. Extend BaseApiClient for new endpoint classes
3. Maintain comprehensive error handling
4. Add unit tests for new features
5. Update documentation for API changes

## License

Internal use only - Erisfy
