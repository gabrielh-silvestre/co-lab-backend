import { randomUUID } from 'node:crypto';

import { Worker } from '@worker/domain/entity/Worker';

const UUID = randomUUID();

describe('[Domain][Unit] Tests for Worker', () => {
  it('should create a Worker', () => {
    const fakeUuid = UUID;
    const worker = new Worker(
      fakeUuid,
      'name',
      18,
      1700,
      new Date(),
      new Date(),
    );

    expect(typeof worker.id).toBe('string');
    expect(typeof worker.name).toBe('string');
    expect(typeof worker.age).toBe('number');
    expect(typeof worker.salary).toBe('number');
    expect(worker.createdAt).toBeInstanceOf(Date);
    expect(worker.updatedAt).toBeInstanceOf(Date);
  });

  it('should convert Worker to plain object', () => {
    const fakeUuid = UUID;
    const worker = new Worker(
      fakeUuid,
      'name',
      18,
      1700,
      new Date(),
      new Date(),
    );

    const workerObject = worker.toObject();

    expect(typeof workerObject.id).toBe('string');
    expect(typeof workerObject.name).toBe('string');
    expect(typeof workerObject.age).toBe('number');
    expect(typeof workerObject.salary).toBe('number');
    expect(workerObject.createdAt).toBeInstanceOf(Date);
    expect(workerObject.updatedAt).toBeInstanceOf(Date);
  });
});
