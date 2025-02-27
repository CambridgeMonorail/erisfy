import { ApiProperty } from '@nestjs/swagger';
import {
  IOnboarding,
  IOnboardingFilter,
  ICreateOnboardingDto,
  IUpdateOnboardingDto
} from '@erisfy/api';

export class Onboarding implements IOnboarding {
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id?: number;

  @ApiProperty({ description: 'User identifier', example: 'user123' })
  userId!: string;

  @ApiProperty({ description: 'Whether user has viewed onboarding', example: true })
  hasViewed!: boolean;

  @ApiProperty({ description: 'Selected onboarding options', example: ['feature1', 'feature2'] })
  chosenOptions!: string[];
}

export class OnboardingFilter implements IOnboardingFilter {
  @ApiProperty({ description: 'Filter by user ID', required: false })
  userId?: string;

  @ApiProperty({ description: 'Filter by viewed status', required: false })
  hasViewed?: boolean;
}

export class CreateOnboardingDto implements ICreateOnboardingDto {
  @ApiProperty({ description: 'User ID associated with the onboarding' })
  userId: string;

  @ApiProperty({ description: 'Whether the onboarding has been viewed' })
  hasViewed: boolean;

  @ApiProperty({ description: 'List of chosen options during onboarding', type: [String] })
  chosenOptions: string[];
}

export class UpdateOnboardingDto implements IUpdateOnboardingDto {
  @ApiProperty({ description: 'User ID associated with the onboarding', required: false })
  userId?: string;

  @ApiProperty({ description: 'Whether the onboarding has been viewed', required: false })
  hasViewed?: boolean;

  @ApiProperty({ description: 'List of chosen options during onboarding', type: [String], required: false })
  chosenOptions?: string[];
}
