import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import { 
    Onboarding, 
    OnboardingFilter, 
    CreateOnboardingDto, 
    UpdateOnboardingDto 
} from '../types/onboarding';

export class OnboardingsEndpoint extends BaseApiClient {
    async getOnboardings(filter?: OnboardingFilter): Promise<ApiResponse<Onboarding[]>> {
        return this.get<Onboarding[]>('/onboardings', { params: filter });
    }

    async getOnboardingById(id: number): Promise<ApiResponse<Onboarding>> {
        return this.get<Onboarding>(`/onboardings/${id}`);
    }

    async createOnboarding(data: CreateOnboardingDto): Promise<ApiResponse<Onboarding>> {
        return this.post<Onboarding>('/onboardings', data);
    }

    async updateOnboarding(id: number, data: UpdateOnboardingDto): Promise<ApiResponse<Onboarding>> {
        return this.patch<Onboarding>(`/onboardings/${id}`, data);
    }

    async replaceOnboarding(id: number, data: CreateOnboardingDto): Promise<ApiResponse<Onboarding>> {
        return this.put<Onboarding>(`/onboardings/${id}`, data);
    }

    async deleteOnboarding(id: number): Promise<ApiResponse<void>> {
        return this.delete<void>(`/onboardings/${id}`);
    }
}
