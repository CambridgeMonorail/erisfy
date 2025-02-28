import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [NewsService, PrismaService],
  controllers: [NewsController],
  exports: [NewsService], // Export NewsService so it can be used in other modules
})
export class NewsModule {}
