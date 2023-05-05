import { randomUUID } from 'node:crypto';

import type { IWorkerProps } from '@worker/domain/entity/Worker.interface';
import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';
import type { ITestInput } from '@utils/types';

import { Worker } from '@worker/domain/entity/Worker';
import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerMemoryRepository } from '@worker/infra/repository/memory/WorkerMemory.repository';

type WorkerSearchInput = { method: string; value: string };

const WORKERS: Worker[] = WorkerFactory.createMany(10);

const WORKER_SEARCHS: ITestInput<WorkerSearchInput>[] = [
  {
    meta: {
      title: 'should be able to find a worker by id',
      expected: WORKERS[0],
    },
    data: { method: 'findById', value: WORKERS[0].id },
  },
  {
    meta: {
      title: 'should be able to find a worker by email',
      expected: WORKERS[0],
    },
    data: { method: 'findByEmail', value: WORKERS[0].email },
  },
  {
    meta: {
      title: 'should return null if not found a worker by id',
      expected: null,
    },
    data: { method: 'findById', value: 'invalid-uuid' },
  },
  {
    meta: {
      title: 'should return null if not found a worker by email',
      expected: null,
    },
    data: { method: 'findByEmail', value: 'invalid-email' },
  },
  {
    meta: {
      title: 'should be able to validate if a worker exists by id',
      expected: true,
    },
    data: { method: 'existsById', value: WORKERS[0].id },
  },
  {
    meta: {
      title: 'should be able to validate if a worker exists by email',
      expected: true,
    },
    data: { method: 'existsByEmail', value: WORKERS[0].email },
  },
  {
    meta: {
      title: 'should be able to validate if a worker not exists by id',
      expected: false,
    },
    data: { method: 'existsById', value: 'invalid-uuid' },
  },
  {
    meta: {
      title: 'should be able to validate if a worker not exists by email',
      expected: false,
    },
    data: { method: 'existsByEmail', value: 'invalid-email' },
  },
];

const WORKER_CREATE_FAILS: ITestInput<IWorkerProps>[] = [
  {
    meta: { title: 'an existing id', expected: 'Register already exists' },
    data: { ...WORKERS[0].toObject(), email: 'new-email@email.com' },
  },
  {
    meta: { title: 'an existing email', expected: 'Register already exists' },
    data: { ...WORKERS[0].toObject(), id: randomUUID() },
  },
];

describe('[Infra][Unit] Tests for WorkerMemoryRepository', () => {
  let repository: IWorkerRepository;

  beforeEach(() => {
    repository = new WorkerMemoryRepository().populate(WORKERS);
  });

  it.each(WORKER_SEARCHS)('$meta.title', async ({ meta, data }) => {
    const result = await repository[data.method](data.value);

    expect(result).toEqual(meta.expected);
  });

  it('should be able to create a worker', async () => {
    const worker = WorkerFactory.createMany(1)[0];

    await repository.create(worker);

    expect(repository.findById(worker.id)).resolves.toEqual(worker);
  });

  it('should be able to update a worker', async () => {
    const worker = WORKERS[0];
    const newWorker = WorkerFactory.createFromRepository({
      ...worker.toObject(),
      name: 'New Name',
    });

    await repository.update(newWorker);

    expect(repository.findById(worker.id)).resolves.toEqual(newWorker);
  });

  it('should be able to delete a worker', async () => {
    const worker = WORKERS[0];

    await repository.delete(worker.id);

    expect(repository.findById(worker.id)).resolves.toBeNull();
  });

  it.each(WORKER_CREATE_FAILS)(
    'should throw an error if try to create a worker with $meta.title',
    async ({ meta, data }) => {
      const worker = WorkerFactory.createFromRepository(data);

      try {
        await repository.create(worker);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(meta.expected);
      }
    },
  );

  it('should throw an error if try to update a worker with an invalid id', async () => {
    try {
      await repository.update(WorkerFactory.createMany(1)[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Register not found');
    }
  });

  it('should throw an error if try to delete a worker with an invalid id', async () => {
    try {
      await repository.delete('invalid-uuid');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Register not found');
    }
  });
});
