import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto, OnboardingFilter, UpdateOnboardingDto, Onboarding } from '@erisfy/api';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('onboardings')
@Controller('onboardings')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @ApiOperation({ summary: 'Get all onboarding records', description: 'Returns all onboarding records with optional filtering' })
  @ApiQuery({ type: OnboardingFilter, required: false })
  @ApiResponse({ status: 200, description: 'List of onboarding records retrieved successfully', type: [Onboarding] })
  @Get()
  findAll(@Query() filter?: OnboardingFilter) {
    return this.onboardingService.findAll(filter);
  }

  @ApiOperation({ summary: 'Get single onboarding record', description: 'Returns a specific onboarding record by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Onboarding record ID' })
  @ApiResponse({ status: 200, description: 'Onboarding record found', type: Onboarding })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create onboarding record', description: 'Creates a new onboarding record' })
  @ApiBody({ type: CreateOnboardingDto })
  @ApiResponse({ status: 201, description: 'Onboarding record created successfully', type: Onboarding })
  @Post()
  create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(createOnboardingDto);
  }

  @ApiOperation({ summary: 'Update onboarding record', description: 'Updates an existing onboarding record' })
  @ApiParam({ name: 'id', type: 'number', description: 'Onboarding record ID' })
  @ApiBody({ type: UpdateOnboardingDto })
  @ApiResponse({ status: 200, description: 'Onboarding record updated successfully', type: Onboarding })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnboardingDto: UpdateOnboardingDto) {
    return this.onboardingService.update(+id, updateOnboardingDto);
  }

  @ApiOperation({ summary: 'Delete onboarding record', description: 'Deletes an onboarding record' })
  @ApiParam({ name: 'id', type: 'number', description: 'Onboarding record ID' })
  @ApiResponse({ status: 200, description: 'Onboarding record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingService.delete(+id);
  }
}
