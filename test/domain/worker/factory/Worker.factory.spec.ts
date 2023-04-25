import { randomUUID } from 'node:crypto';

import type { ITestInput } from '@utils/types';

import { Worker } from '@worker/domain/entity/Worker';
import {
  CreateWorkerProps,
  WorkerFactory,
} from '@worker/domain/factory/Worker.factory';

const UUID = randomUUID();

const SUCCESS_WORKER_CREATE: ITestInput<CreateWorkerProps>[] = [
  {
    meta: { title: 'with age and salary', expected: Worker },
    data: {
      id: UUID,
      name: 'name',
      email: 'email@email.com',
      age: 18,
      salary: 1700,
    },
  },
  {
    meta: { title: 'without age and salary', expected: Worker },
    data: {
      id: UUID,
      name: 'name',
      email: 'email@email.com',
    },
  },
  {
    meta: { title: 'with age and without salary', expected: Worker },
    data: {
      id: UUID,
      name: 'name',
      email: 'email@email.com',
      age: 18,
    },
  },
  {
    meta: { title: 'without age and with salary', expected: Worker },
    data: {
      id: UUID,
      name: 'name',
      email: 'email@email.com',
      salary: 1700,
    },
  },
];

describe('[Domain][Unit] Tests for WorkerFactory', () => {
  it.each(SUCCESS_WORKER_CREATE)(
    'should create a new Worker $meta.title',
    ({ meta, data }) => {
      const worker = WorkerFactory.create(data);

      expect(worker).toBeInstanceOf(meta.expected);
    },
  );

  it('should create a new Worker from repository', () => {
    const worker = WorkerFactory.createFromRepository({
      id: randomUUID(),
      name: 'name',
      email: 'email@email.com',
      age: 18,
      salary: 1700,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(worker).toBeInstanceOf(Worker);
  });

  it('should create many Workers', () => {
    const workers = WorkerFactory.createMany(10);

    expect(workers).toHaveLength(10);
    expect(workers.every((worker) => worker instanceof Worker)).toBeTruthy();
  });
});
