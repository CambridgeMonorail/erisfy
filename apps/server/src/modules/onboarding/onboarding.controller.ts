import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateOnboardingDto, UpdateOnboardingDto, OnboardingFilter } from './dto/onboarding.dto';
import { Onboarding } from './entities/onboarding.entity';

@ApiTags('onboardings')
@Controller('onboardings')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @ApiOperation({
    summary: 'Get all onboarding records',
    description: `Returns all onboarding records with optional filtering.

      Data Source:
      - Retrieves data directly from database via Prisma
      - No external API calls

      Features:
      - Supports filtering by various criteria
      - Results are returned in a consistent format
      - Includes all onboarding data fields`
  })
  @ApiQuery({ type: OnboardingFilter, required: false })
  @ApiResponse({ status: 200, description: 'List of onboarding records retrieved successfully', type: [Onboarding] })
  @Get()
  findAll(@Query() filter?: OnboardingFilter) {
    return this.onboardingService.findAll(filter);
  }

  @ApiOperation({
    summary: 'Get single onboarding record',
    description: `Returns a specific onboarding record by ID.

      Data Source:
      - Retrieves data directly from database via Prisma
      - No external API calls

      Parameters:
      - id: Unique identifier for the onboarding record`
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Onboarding record ID' })
  @ApiResponse({ status: 200, description: 'Onboarding record found', type: Onboarding })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Create onboarding record',
    description: `Creates a new onboarding record.

      Data Source:
      - Writes data directly to database via Prisma
      - No external API calls

      Validation:
      - Input validation performed on required fields
      - Returns the newly created record with ID`
  })
  @ApiBody({ type: CreateOnboardingDto })
  @ApiResponse({ status: 201, description: 'Onboarding record created successfully', type: Onboarding })
  @Post()
  create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(createOnboardingDto);
  }

  @ApiOperation({
    summary: 'Update onboarding record',
    description: `Updates an existing onboarding record.

      Data Source:
      - Updates data directly in database via Prisma
      - No external API calls

      Parameters:
      - id: Unique identifier for the record to update

      Process:
      - Validates record exists
      - Applies partial updates
      - Returns updated record`
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Onboarding record ID' })
  @ApiBody({ type: UpdateOnboardingDto })
  @ApiResponse({ status: 200, description: 'Onboarding record updated successfully', type: Onboarding })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnboardingDto: UpdateOnboardingDto) {
    return this.onboardingService.update(+id, updateOnboardingDto);
  }

  @ApiOperation({
    summary: 'Delete onboarding record',
    description: `Deletes an onboarding record.

      Data Source:
      - Removes data directly from database via Prisma
      - No external API calls

      Parameters:
      - id: Unique identifier for the record to delete

      Process:
      - Validates record exists
      - Permanently removes the record
      - Returns success confirmation`
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Onboarding record ID' })
  @ApiResponse({ status: 200, description: 'Onboarding record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingService.delete(+id);
  }
}
