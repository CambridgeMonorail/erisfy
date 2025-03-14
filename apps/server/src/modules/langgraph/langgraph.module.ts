import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from '../news/news.module';
import { LangGraphService } from './langgraph.service';
import { LangGraphController } from './langgraph.controller';
import { NewsFetcherService } from './services/news-fetcher.service';
import { NewsAnalyserService } from './services/news-analyser.service';
import { StockDataService } from './services/stock-data.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TavilyModule } from '../tavily/tavily.module';

@Module({
  imports: [
    ConfigModule,
    NewsModule,
    TavilyModule,
    CacheModule.register({
      ttl: 5 * 60 * 1000, // 5 minutes
      max: 100 // Maximum number of items in cache
    })
  ],
  controllers: [LangGraphController],
  providers: [
    LangGraphService,
    NewsFetcherService,
    NewsAnalyserService,
    StockDataService
  ],
  exports: [LangGraphService]
})
export class LangGraphModule {}
