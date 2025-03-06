import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LangGraphService } from './langgraph.service';
import { LangGraphController } from './langgraph.controller';
import { NewsFetcherService } from './services/news-fetcher.service';
import { NewsAnalyserService } from './services/news-analyser.service';
import { StockDataService } from './services/stock-data.service';

@Module({
  imports: [ConfigModule],
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
