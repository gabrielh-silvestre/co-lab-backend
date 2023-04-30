import { randomUUID } from 'node:crypto';

import type { ITestInput } from '@utils/types';

import { Worker } from '@worker/domain/entity/Worker';

import { TIMESTPAMP_PATTERN } from '@utils/mocks';

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
