import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { CustomExceptionFilter } from '@shared/infra/exception-filter/CustomException.filter';
import { ApiKeyGuard } from '@shared/infra/guard/ApiKey.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard(configService));

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
}
bootstrap();
