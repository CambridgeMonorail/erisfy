import { Module } from '@nestjs/common';
import { BasicNewsAnalysisService } from './basic-news-analysis.service';
import { PrismaService } from '../../prisma.service';
import { BasicNewsAnalysisController } from './basic-news-analysis.controller';

@Module({
  providers: [BasicNewsAnalysisService, PrismaService],
  controllers: [BasicNewsAnalysisController],
  exports: [BasicNewsAnalysisService],
})
export class BasicNewsAnalysisModule {}
