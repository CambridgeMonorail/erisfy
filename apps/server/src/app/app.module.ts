import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiModule } from '../modules/openai/openai.module';
import { MarketNewsModule } from '../modules/market-news/market-news.module';
import { OnboardingModule } from '../modules/onboarding/onboarding.module';
import { NewsAnalysisModule } from '../modules/news-analysis/news-analysis.module';
import { StockDataModule } from '../modules/stock-data/stock-data.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OpenAiModule,
    MarketNewsModule,
    OnboardingModule,
    NewsAnalysisModule,
    StockDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
