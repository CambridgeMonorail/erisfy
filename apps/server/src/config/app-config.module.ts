import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * AppConfigModule is a module that sets up the configuration for the application.
 * It uses the `ConfigModule` from `@nestjs/config` to load environment variables
 * from `.env.development` or `.env.production` files and validates them using Joi.
 *
 * The following environment variables are validated:
 * - `PORT`: The port number on which the server will run. Defaults to 3001.
 * - `NODE_ENV`: The environment in which the application is running. Can be 'development', 'production', or 'test'.
 * - `OPENAI_API_KEY`: The API key for OpenAI. This is a required field.
 *
 * The validation options are set to abort early if any validation fails.
 *
 * @module AppConfigModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
        '.env.example'
      ],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3001),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        OPENAI_API_KEY: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
