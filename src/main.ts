import { ForbiddenException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { CustomExceptionFilter } from '@shared/infra/exception-filter/CustomException.filter';
import { ApiKeyGuard } from '@shared/infra/guard/ApiKey.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard(configService));

  const port = configService.get<number>('PORT', 3000);

  app.enableCors({
    origin: (origin, cb) => {
      const allowedOriginsStr =
        configService.getOrThrow<string>('ALLOWED_ORIGINS');
      const allowedOrigins = allowedOriginsStr.split(',');

      if (allowedOrigins.indexOf(origin) !== -1) {
        cb(null, true);
        return;
      }

      cb(new ForbiddenException('Not allowed by CORS'));
    },
    allowedHeaders: '*',
    methods: '*',
  });

  await app.listen(port);
}
bootstrap();
