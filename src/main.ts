import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { AllExceptionFilter } from '@/common/exception.filter';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe()); // 启用装饰器校验
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
  logger.log(`Running on ${await app.getUrl()}`);
}

bootstrap();
