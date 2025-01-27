import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  logger.log(`Running on ${await app.getUrl()}`);
}

bootstrap();
