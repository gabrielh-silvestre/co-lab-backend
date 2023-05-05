import { randomUUID } from 'node:crypto';

import type { ITestInput } from '@utils/types';

import { Worker } from '@worker/domain/entity/Worker';
import { WorkerValidationException } from '@worker/domain/exception/Validation.exception';

import { TIMESTPAMP_PATTERN, mockWorkerEventEmitter } from '@utils/mocks';

const UUID = randomUUID();

const SUCCESS_WORKER_CREATE: ITestInput<Worker>[] = [
  {
    meta: { title: 'with age and salary', expected: 'number' },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
  {
    meta: { title: 'without age and salary', expected: 'object' },
    data: new Worker(UUID, 'name', 'email@email.com', new Date(), new Date()),
  },
];

const SUCCESS_WORKER_UPDATE: ITestInput<Worker>[] = [
  {
    meta: { title: 'name', expected: 'new name' },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
  {
    meta: { title: 'age', expected: 26 },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
  {
    meta: { title: 'salary', expected: 2000 },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
];

const FAILD_WORKER_UPDATE: ITestInput<Worker>[] = [
  {
    meta: { title: 'name', expected: WorkerValidationException },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
  {
    meta: { title: 'age', expected: WorkerValidationException },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
  {
    meta: { title: 'salary', expected: WorkerValidationException },
    data: new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    ),
  },
];

describe('[Domain][Unit] Tests for Worker', () => {
  it.each(SUCCESS_WORKER_CREATE)(
    'should create a Worker $meta.title',
    ({ meta, data }) => {
      expect(typeof data.id).toBe('string');
      expect(typeof data.name).toBe('string');
      expect(typeof data.email).toBe('string');
      expect(typeof data.age).toBe(meta.expected);
      expect(typeof data.salary).toBe(meta.expected);
      expect(data.createdAt).toBeInstanceOf(Date);
      expect(data.updatedAt).toBeInstanceOf(Date);
    },
  );

  it.each(SUCCESS_WORKER_UPDATE)(
    'should change a Worker $meta.title',
    ({ meta, data }) => {
      const captalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);
      const method = `change${captalize(meta.title)}` as any;

      data[method](mockWorkerEventEmitter, meta.expected);

      expect(mockWorkerEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(data[meta.title]).toBe(meta.expected);
    },
  );

  it.each(FAILD_WORKER_UPDATE)(
    'should throw a WorkerValidationException when invalid chage Worker $meta.title',
    ({ meta, data }) => {
      const captalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);
      const method = `change${captalize(meta.title)}` as any;

      const act = () => data[method](mockWorkerEventEmitter, data[meta.title]);

      try {
        act();
        fail('should throw a WorkerValidationException');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(meta.expected);
      }
    },
  );

  it('should convert Worker to plain object', () => {
    const worker = new Worker(
      UUID,
      'name',
      'email@email.com',
      new Date(),
      new Date(),
      18,
      1700,
    );

    const workerObject = worker.toObject();

    expect(typeof workerObject.id).toBe('string');
    expect(typeof workerObject.name).toBe('string');
    expect(typeof workerObject.email).toBe('string');
    expect(typeof workerObject.age).toBe('number');
    expect(typeof workerObject.salary).toBe('number');

    expect(workerObject.createdAt).toMatch(TIMESTPAMP_PATTERN);
    expect(workerObject.updatedAt).toMatch(TIMESTPAMP_PATTERN);
  });
});
