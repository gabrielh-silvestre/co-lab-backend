import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';

import type {
  RegisterWorkerBody,
  UpdateWorkerBody,
} from '@worker/infra/controller/Woker.controller.dto';

import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerService } from '@worker/domain/service/Worker.service';

import { WorkerMemoryRepository } from '@worker/infra/repository/memory/WorkerMemory.repository';

import { FindWorkerByIdUseCase } from '@worker/app/useCase/findById/FindWorkerById.useCase';
import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { UpdateWorkerUseCase } from '@worker/app/useCase/update/UpdateWorker.useCase';

import { WorkerController } from '@worker/infra/controller/Worker.controller';
import { SupabaseAuthGateway } from '@shared/infra/gateway/auth/supabase/SupabaseAuth.gateway';

import {
  AUTH_GATEWAY,
  SUPABASE_CLIENT,
  WORKER_EVENT_EMITTER,
  WORKER_REPOSITORY,
} from '@utils/constants';
import { mockWorkerEventEmitter } from '@utils/mocks';

const UUID = randomUUID();
const WORKERS = WorkerFactory.createMany(10);

describe('[Infra][Integration] Tests for WorkerController', () => {
  let controller: WorkerController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [
        WorkerService,
        FindWorkerByIdUseCase,
        RegisterWorkerUseCase,
        UpdateWorkerUseCase,
        {
          provide: WORKER_REPOSITORY,
          useClass: WorkerMemoryRepository,
        },
        {
          provide: WORKER_EVENT_EMITTER,
          useValue: mockWorkerEventEmitter,
        },
        {
          provide: AUTH_GATEWAY,
          useClass: SupabaseAuthGateway,
        },
        {
          provide: SUPABASE_CLIENT,
          useValue: {
            auth: {
              getUser: () => ({}),
            },
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(WorkerController);
    moduleRef.get<WorkerMemoryRepository>(WORKER_REPOSITORY).populate(WORKERS);
  });

  it('should create a WorkerController', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(WorkerController);
  });

  it('should register a worker', async () => {
    const dto: RegisterWorkerBody = {
      id: UUID,
      email: `${UUID}@email.com`,
      name: 'name',
    };

    const response = await controller.register(dto);
    const eventName = jest.mocked(mockWorkerEventEmitter.emit).mock.calls[0][0]
      .name;

    expect(eventName).toBe('WorkerRegistered');

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('updatedAt');
  });

  it('should update a worker', async () => {
    const dto: UpdateWorkerBody = {
      name: 'new name',
    };

    const response = await controller.update(WORKERS[0].id, dto);
    const eventName = jest.mocked(mockWorkerEventEmitter.emit).mock.calls[0][0]
      .name;

    expect(eventName).toBe('WorkerChangedName');

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('updatedAt');
  });

  it('should find a worker by id', async () => {
    const response = await controller.findById(WORKERS[0].id);

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id', WORKERS[0].id);
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('updatedAt');
  });
});
