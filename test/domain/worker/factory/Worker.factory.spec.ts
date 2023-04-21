import { randomUUID } from 'node:crypto';

import { Worker } from '@worker/domain/entity/Worker';
import { WorkerFactory } from '@worker/domain/factory/Worker.factory';

describe('[Domain][Unit] Tests for WorkerFactory', () => {
  it('should create a new Worker', () => {
    const worker = WorkerFactory.create({
      id: randomUUID(),
      name: 'name',
      age: 18,
      salary: 1700,
    });

    expect(worker).toBeInstanceOf(Worker);
  });

  it('should create a new Worker from repository', () => {
    const worker = WorkerFactory.createFromRepository({
      id: randomUUID(),
      name: 'name',
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
