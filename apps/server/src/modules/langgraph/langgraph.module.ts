import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LangGraphService } from './langgraph.service';
import { LangGraphController } from './langgraph.controller';
import { NewsFetcherService } from './services/news-fetcher.service';
import { NewsAnalyserService } from './services/news-analyser.service';
import { StockDataService } from './services/stock-data.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TavilyModule } from '../tavily/tavily.module';
import { PrismaService } from '../../prisma.service';
import { LLMAnalyzerService } from './services/llm-analyzer.service';
import { ArticleManagerService } from './services/article-manager.service';
import { TickerExtractorService } from './services/ticker-extractor.service';

@Module({
  imports: [
    ConfigModule,
    TavilyModule,
    CacheModule.register({
      ttl: 5 * 60 * 1000, // 5 minutes
      max: 100, // Maximum number of items in cache
    }),
  ],
  controllers: [LangGraphController],
  providers: [
    LangGraphService,
    NewsFetcherService,
    NewsAnalyserService,
    StockDataService,
    PrismaService,
    LLMAnalyzerService,
    ArticleManagerService,
    TickerExtractorService,
  ],
  exports: [LangGraphService, NewsAnalyserService],
})
export class LangGraphModule {}
