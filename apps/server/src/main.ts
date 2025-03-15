import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS for development
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://cambridgemonorail.github.io'
      : 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configure Swagger documentation to match actual controller endpoints
  const config = new DocumentBuilder()
    .setTitle('Erisfy API')
    .setDescription('REST API documentation for the Erisfy market news analysis and data processing server')
    .setVersion('1.0')
    // Tags match the actual @ApiTags used in controllers
    .addTag('market-insights', 'Real-time market news and insights with AI analysis')
    .addTag('news-analysis', 'Advanced AI-powered financial news analysis using LangGraph')
    .addTag('basic-news-analysis', 'Simple sentiment and topic extraction from news content')
    .addTag('onboardings', 'User onboarding workflow management')
    .addTag('openai', 'OpenAI integration for market analysis')
    .addTag('stock-data', 'Stock market data and analysis')
    .addTag('Tavily', 'Financial information search and research')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `📚 Swagger documentation available at: http://localhost:${port}/${globalPrefix}/docs`
  );
}

bootstrap();
