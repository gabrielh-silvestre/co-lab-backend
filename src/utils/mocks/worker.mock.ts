import { randomUUID } from 'node:crypto';

import type { IWorkerProps } from '@worker/domain/entity/Worker.interface';
import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';

import {
  CreateWorkerProps,
  WorkerFactory,
} from '@worker/domain/factory/Worker.factory';

export const WORKER_INPUT: CreateWorkerProps = (() => {
  const UUID = randomUUID();
  return {
    id: UUID,
    name: 'name',
    email: `${UUID}@email.com`,
    age: 18,
    salary: 1700,
  };
})();

export const WORKER: IWorkerProps = WorkerFactory.createMany(1)[0].toObject();

export const mockWorkerRepository: IWorkerRepository = {
  findById: jest.fn().mockResolvedValue(undefined),
  findByEmail: jest.fn().mockResolvedValue(undefined),
  create: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  existsByEmail: jest.fn().mockResolvedValue(undefined),
  existsById: jest.fn().mockResolvedValue(undefined),
};

export const mockWorkerEventEmitter: IEventEmitter = {
  emit: jest.fn().mockResolvedValue(undefined),
  register: jest.fn().mockReturnValue(undefined),
  unregister: jest.fn().mockReturnValue(undefined),
  unregisterAll: jest.fn().mockReturnValue(undefined),
};
