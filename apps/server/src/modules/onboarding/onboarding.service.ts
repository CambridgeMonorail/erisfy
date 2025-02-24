import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOnboardingDto, OnboardingFilter, UpdateOnboardingDto } from '@erisfy/api';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter?: OnboardingFilter) {
    return this.prisma.onboarding.findMany({
      where: {
        ...(filter?.userId && { userId: filter.userId }),
        ...(filter?.hasViewed !== undefined && { hasViewed: filter.hasViewed }),
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.onboarding.findUnique({
      where: { id },
    });
  }

  async create(data: CreateOnboardingDto) {
    return this.prisma.onboarding.create({
      data,
    });
  }

  async update(id: number, data: UpdateOnboardingDto) {
    return this.prisma.onboarding.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.onboarding.delete({
      where: { id },
    });
  }
}
