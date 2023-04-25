import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WorkerMemoryRepository } from '@worker/infra/repository/memory/WorkerMemory.repository';
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
      useClass: WorkerMemoryRepository,
    },
  ],
})
export class AppModule {}
