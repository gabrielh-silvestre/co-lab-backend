import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';

import { WorkerPrismaRepository } from '@worker/infra/repository/prisma/WorkerPrisma.repository';
import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { WorkerController } from '@worker/infra/controller/Worker.controller';

import {
  SUPABASE_CLIENT,
  WORKER_EVENT_EMITTER,
  WORKER_REPOSITORY,
} from '@utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController, WorkerController],
  providers: [
    AppService,
    RegisterWorkerUseCase,
    {
      provide: SUPABASE_CLIENT,
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('DB_URL');
        const supabaseKey = configService.get<string>('SERVICE_ROLE_KEY');
        return createClient(supabaseUrl, supabaseKey);
      },
      inject: [ConfigService],
    },
    {
      provide: WORKER_EVENT_EMITTER,
      useValue: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        emit: () => {},
      },
    },
    {
      provide: WORKER_REPOSITORY,
      useClass: WorkerPrismaRepository,
    },
  ],
})
export class AppModule {}
