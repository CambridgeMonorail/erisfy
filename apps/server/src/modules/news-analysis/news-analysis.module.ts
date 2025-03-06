import { Module } from '@nestjs/common';
import { NewsAnalysisService } from './news-analysis.service';

import { PrismaService } from '../../prisma.service';
import { NewsAnalysisController } from './news-analysis.controller';

@Module({
  providers: [NewsAnalysisService, PrismaService],
  controllers: [NewsAnalysisController],
  exports: [NewsAnalysisService], // Export NewsAnalysisService so it can be used in other modules
})
export class NewsAnalysisModule {}
