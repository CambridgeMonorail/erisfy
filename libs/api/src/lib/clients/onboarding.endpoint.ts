import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import {
  IOnboarding,
  IOnboardingFilter,
  ICreateOnboardingDto,
  IUpdateOnboardingDto
} from '../types/onboarding';

export class OnboardingsEndpoint extends BaseApiClient {
  protected basePath = '/onboardings';

  constructor(config: ConstructorParameters<typeof BaseApiClient>[0]) {
    super(config);
  }

  async getOnboardings(filter?: IOnboardingFilter): Promise<ApiResponse<IOnboarding[]>> {
    const queryParams = new URLSearchParams();
    if (filter?.userId) queryParams.append('userId', filter.userId);
    if (filter?.hasViewed !== undefined) queryParams.append('hasViewed', String(filter.hasViewed));

    return this.get<IOnboarding[]>(`${this.basePath}?${queryParams}`);
  }

  async getOnboardingById(id: number): Promise<ApiResponse<IOnboarding>> {
    return this.get<IOnboarding>(`${this.basePath}/${id}`);
  }

  async createOnboarding(data: ICreateOnboardingDto): Promise<ApiResponse<IOnboarding>> {
    return this.post<IOnboarding>(this.basePath, data);
  }

  async updateOnboarding(id: number, data: IUpdateOnboardingDto): Promise<ApiResponse<IOnboarding>> {
    return this.patch<IOnboarding>(`${this.basePath}/${id}`, data);
  }

  async deleteOnboarding(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`${this.basePath}/${id}`);
  }
}
