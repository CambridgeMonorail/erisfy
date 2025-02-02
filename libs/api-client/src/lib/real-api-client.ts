import { IMyAPIClient } from './api-client.interface';
import { getResource as realGetResource } from './my-api-client';

export class RealAPIClient implements IMyAPIClient {
  getResource(id: string) {
    return realGetResource(id);
  }
}