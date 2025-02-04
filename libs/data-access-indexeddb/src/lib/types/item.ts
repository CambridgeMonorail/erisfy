// 1) Define the shape of the data you want to store.
export interface Item {
    id?: number;          // Primary key (auto-increment)
    name: string;         // Indexed field
    description?: string; // Optional field
  }