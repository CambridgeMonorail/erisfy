import { BaseApiClient } from '../base/BaseApiClient';
import { ApiResponse } from '../types/api';
import {
    IOnboarding,
    IOnboardingFilter,
    ICreateOnboardingDto,
    IUpdateOnboardingDto
} from '../types/onboarding';

export type OnboardingStatus = {
    hasViewed: boolean;
    lastViewedAt?: string;
};

export class OnboardingsEndpoint extends BaseApiClient {
    async getOnboardings(filter?: IOnboardingFilter): Promise<ApiResponse<IOnboarding[]>> {
        return this.get<IOnboarding[]>('/onboardings', { params: filter });
    }

    async getOnboardingById(id: number): Promise<ApiResponse<IOnboarding>> {
        return this.get<IOnboarding>(`/onboardings/${id}`);
    }

    async createOnboarding(data: ICreateOnboardingDto): Promise<ApiResponse<IOnboarding>> {
        return this.post<IOnboarding>('/onboardings', data);
    }

    async updateOnboarding(id: number, data: IUpdateOnboardingDto): Promise<ApiResponse<IOnboarding>> {
        return this.patch<IOnboarding>(`/onboardings/${id}`, data);
    }

    async replaceOnboarding(id: number, data: ICreateOnboardingDto): Promise<ApiResponse<IOnboarding>> {
        return this.put<IOnboarding>(`/onboardings/${id}`, data);
    }

    async deleteOnboarding(id: number): Promise<ApiResponse<void>> {
        return this.delete<void>(`/onboardings/${id}`);
    }
}
