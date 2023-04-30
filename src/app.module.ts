import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';

import { WorkerPrismaRepository } from '@worker/infra/repository/prisma/WorkerPrisma.repository';
import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { WorkerController } from '@worker/infra/controller/Worker.controller';

import { CompanyMemoryRepository } from '@company/infra/repository/memory/CompanyMemory.repository';
import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';
import { AddEvaluationUseCase } from '@company/app/useCase/addEvaluation/AddEvaluation.useCase';
import { FindCompanyByIdUseCase } from '@company/app/useCase/findById/FindCompanyById.useCase';
import { SearchCompanyByNameUseCase } from '@company/app/useCase/searchByName/SearchCompanyByName.useCase';
import { CompanyController } from '@company/infra/controller/Company.controller';

import {
  COMPANY_REPOSITORY,
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
  controllers: [AppController, WorkerController, CompanyController],
  providers: [
    AppService,
    RegisterWorkerUseCase,
    CreateCompanyUseCase,
    AddEvaluationUseCase,
    FindCompanyByIdUseCase,
    SearchCompanyByNameUseCase,
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
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyMemoryRepository,
    },
  ],
})
export class AppModule {}
