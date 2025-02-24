import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto, OnboardingFilter, UpdateOnboardingDto } from '@erisfy/api';

@Controller('onboardings')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get()
  findAll(@Query() filter?: OnboardingFilter) {
    return this.onboardingService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOne(+id);
  }

  @Post()
  create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(createOnboardingDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnboardingDto: UpdateOnboardingDto) {
    return this.onboardingService.update(+id, updateOnboardingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingService.delete(+id);
  }
}
