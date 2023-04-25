import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { InfraExceptionFilter } from '@shared/infra/exception-filter/InfraException.filter';
import { ApplicationExceptionFilter } from '@shared/infra/exception-filter/ApplicationException.filter';
import { DomainExceptionFilter } from '@shared/infra/exception-filter/DomainException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new InfraExceptionFilter(),
    new ApplicationExceptionFilter(),
    new DomainExceptionFilter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
}
bootstrap();
