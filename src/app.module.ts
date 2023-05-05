import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';

import { WorkerService } from '@worker/domain/service/Worker.service';

import { WorkerPrismaRepository } from '@worker/infra/repository/prisma/WorkerPrisma.repository';
import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { UpdateWorkerUseCase } from '@worker/app/useCase/update/UpdateWorker.useCase';
import { WorkerController } from '@worker/infra/controller/Worker.controller';

import { CompanyPrismaRepository } from '@company/infra/repository/prisma/CompanyPrisma.repository';
import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';
import { AddEvaluationUseCase } from '@company/app/useCase/addEvaluation/AddEvaluation.useCase';
import { FindCompanyByIdUseCase } from '@company/app/useCase/findById/FindCompanyById.useCase';
import { SearchCompanyUseCase } from '@company/app/useCase/search/SearchCompany.useCase';
import { CompanyController } from '@company/infra/controller/Company.controller';

import { SupabaseAuthGateway } from '@shared/infra/gateway/auth/supabase/SupabaseAuth.gateway';

import {
  AUTH_GATEWAY,
  COMPANY_EVENT_EMITTER,
  COMPANY_REPOSITORY,
  SUPABASE_CLIENT,
  WORKER_EVENT_EMITTER,
  WORKER_REPOSITORY,
} from '@utils/constants';
import { FindWorkerByIdUseCase } from '@worker/app/useCase/findById/FindWorkerById.useCase';

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
    WorkerService,
    FindWorkerByIdUseCase,
    RegisterWorkerUseCase,
    UpdateWorkerUseCase,
    CreateCompanyUseCase,
    AddEvaluationUseCase,
    FindCompanyByIdUseCase,
    SearchCompanyUseCase,
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
      provide: COMPANY_EVENT_EMITTER,
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
      useClass: CompanyPrismaRepository,
    },
    {
      provide: AUTH_GATEWAY,
      useClass: SupabaseAuthGateway,
    },
  ],
})
export class AppModule {}
