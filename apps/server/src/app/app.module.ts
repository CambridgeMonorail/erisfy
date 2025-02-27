import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiModule } from '../modules/openai/openai.module';
import { MarketNewsModule } from '../modules/market-news/market-news.module';
import { OnboardingModule } from '../modules/onboarding/onboarding.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OpenAiModule,
    MarketNewsModule,
    OnboardingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
