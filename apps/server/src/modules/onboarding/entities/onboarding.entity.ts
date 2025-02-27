import { ApiProperty } from '@nestjs/swagger';
import { IOnboarding } from '@erisfy/api';

export class Onboarding implements IOnboarding {
  @ApiProperty({ description: 'Unique identifier for the onboarding record' })
  id: number;

  @ApiProperty({ description: 'User ID associated with the onboarding' })
  userId: string;

  @ApiProperty({ description: 'Whether the onboarding has been viewed' })
  hasViewed: boolean;

  @ApiProperty({ description: 'List of chosen options during onboarding', type: [String] })
  chosenOptions: string[];

  @ApiProperty({ description: 'When the onboarding was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the onboarding was last updated' })
  updatedAt: Date;
}
