export interface IMyAPIClient {
    getResource(id: string): Promise<any>;
  }
  