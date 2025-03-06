import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './openai.service';
import { OpenAiConfigProvider } from './providers/openai-config.provider';
import { OpenAiController } from './openai.controller';

/**
 * Module that handles OpenAI integrations
 * Provides OpenAI services and controllers for the application
 */
@Module({
  imports: [ConfigModule],
  controllers: [OpenAiController],
  providers: [OpenAiConfigProvider, OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
