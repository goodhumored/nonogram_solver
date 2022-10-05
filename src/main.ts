import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger("AppBootstrap", { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(logger);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>("APP_PORT", 3000);

  await app.listen(port);
  await app.init();
  logger.log(`Application listens on http://localhost:${port}/`)

  logger.log(`Application successfully started`);
}
bootstrap();
