import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TavilyController } from './tavily.controller';
import { TavilyService } from './tavily.service';

/**
 * TavilyModule integrates with the Tavily search API to provide intelligent
 * search capabilities for financial market information.
 */
@Module({
  imports: [ConfigModule],
  controllers: [TavilyController],
  providers: [TavilyService],
  exports: [TavilyService],
})
export class TavilyModule {}
