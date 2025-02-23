import { Module } from '@nestjs/common';
import { MarketNewsService } from './market-news.service';
import { MarketNewsController } from './market-news.controller';
import { OpenAiModule } from '../openai/openai.module';
import { PrismaService } from '../../prisma.service';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [OpenAiModule, NewsModule],
  providers: [MarketNewsService, PrismaService],
  controllers: [MarketNewsController],
})
export class MarketNewsModule {}
