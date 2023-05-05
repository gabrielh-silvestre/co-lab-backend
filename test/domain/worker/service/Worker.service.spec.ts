import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerService } from '@worker/domain/service/Worker.service';

import { mockWorkerEventEmitter } from '@utils/mocks';

describe('[Domain][Unit] Tests for WorkerService', () => {
  let workerService: WorkerService;

  beforeEach(() => {
    workerService = new WorkerService(mockWorkerEventEmitter);
  });

  it('should create a WorkerService', () => {
    expect(workerService).toBeDefined();
    expect(workerService).toBeInstanceOf(WorkerService);
  });

  it('should update a Worker', () => {
    const worker = WorkerFactory.createMany(1)[0];
    const originalWorker = { ...worker.toObject() };

    workerService.update(worker, { name: 'new name' });
    workerService.update(worker, { age: 20 });
    workerService.update(worker, { salary: 2000 });

    expect(mockWorkerEventEmitter.emit).toHaveBeenCalledTimes(3);

    expect(worker.name).not.toBe(originalWorker.name);
    expect(worker.age).not.toBe(originalWorker.age);
    expect(worker.salary).not.toBe(originalWorker.salary);

    expect(worker.name).toBe('new name');
    expect(worker.age).toBe(20);
    expect(worker.salary).toBe(2000);
  });
});
