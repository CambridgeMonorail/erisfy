import { ApiProperty } from '@nestjs/swagger';

export class Onboarding {
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id?: number = undefined;

  @ApiProperty({ description: 'User identifier', example: 'user123' })
  userId!: string;

  @ApiProperty({ description: 'Whether user has viewed onboarding', example: true })
  hasViewed!: boolean;

  @ApiProperty({ description: 'Selected onboarding options', example: ['feature1', 'feature2'] })
  chosenOptions!: string[];
}

export class OnboardingFilter {
  @ApiProperty({ description: 'Filter by user ID', required: false, example: 'user123' })
  userId?: string = undefined;

  @ApiProperty({ description: 'Filter by viewed status', required: false, example: true })
  hasViewed?: boolean = undefined;
}

export class CreateOnboardingDto implements Omit<Onboarding, 'id'> {
  @ApiProperty({ description: 'User identifier', example: 'user123' })
  userId!: string;

  @ApiProperty({ description: 'Whether user has viewed onboarding', example: false })
  hasViewed!: boolean;

  @ApiProperty({ description: 'Selected onboarding options', example: ['feature1', 'feature2'] })
  chosenOptions!: string[];
}

export class UpdateOnboardingDto implements Partial<CreateOnboardingDto> {
  @ApiProperty({ description: 'User identifier', required: false, example: 'user123' })
  userId?: string = undefined;

  @ApiProperty({ description: 'Whether user has viewed onboarding', required: false, example: true })
  hasViewed?: boolean = undefined;

  @ApiProperty({ description: 'Selected onboarding options', required: false, example: ['feature1', 'feature2'] })
  chosenOptions?: string[] = undefined;
}
