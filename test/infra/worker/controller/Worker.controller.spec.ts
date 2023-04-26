import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';

import type { RegisterWorkerBody } from '@worker/infra/controller/Woker.controller.dto';

import { WorkerMemoryRepository } from '@worker/infra/repository/memory/WorkerMemory.repository';
import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { WorkerController } from '@worker/infra/controller/Worker.controller';

import { WORKER_EVENT_EMITTER, WORKER_REPOSITORY } from '@utils/constants';

const UUID = randomUUID();

describe('[Infra][Integration] Tests for WorkerController', () => {
  let controller: WorkerController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [
        RegisterWorkerUseCase,
        {
          provide: WORKER_REPOSITORY,
          useClass: WorkerMemoryRepository,
        },
        {
          provide: WORKER_EVENT_EMITTER,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(WorkerController);
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

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('updatedAt');
  });
});
