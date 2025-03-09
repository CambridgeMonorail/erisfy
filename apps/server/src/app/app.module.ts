import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiModule } from '../modules/openai/openai.module';
import { MarketNewsModule } from '../modules/market-news/market-news.module';
import { OnboardingModule } from '../modules/onboarding/onboarding.module';
import { BasicNewsAnalysisModule } from '../modules/basic-news-analysis/basic-news-analysis.module';
import { StockDataModule } from '../modules/stock-data/stock-data.module';
import { TavilyModule } from '../modules/tavily/tavily.module';
import { LangGraphModule } from '../modules/langgraph/langgraph.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OpenAiModule,
    MarketNewsModule,
    OnboardingModule,
    BasicNewsAnalysisModule,
    StockDataModule,
    TavilyModule,
    LangGraphModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
