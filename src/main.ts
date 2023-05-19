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

  app.enableCors({
    origin: (origin) => {
      const allowedOriginsStr =
        configService.getOrThrow<string>('ALLOWED_ORIGINS');
      const allowedOrigins = allowedOriginsStr.split(',');

      if (!origin || allowedOrigins.includes(origin)) {
        return origin;
      }

      throw new Error('Origin not allowed by CORS');
    },
    allowedHeaders: '*',
    methods: '*',
  });

  await app.listen(port);
}
bootstrap();
