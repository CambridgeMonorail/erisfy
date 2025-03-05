import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StockDataService } from './services/stock-data.service';
import { StockDataController } from './controllers/stock-data.controller';

/**
 * Module for handling stock data retrieval and processing
 * Integrates with Financial Datasets API and other potential data sources
 */
@Module({
  imports: [ConfigModule],
  providers: [StockDataService],
  exports: [StockDataService],
  controllers: [StockDataController],
})
export class StockDataModule {}
