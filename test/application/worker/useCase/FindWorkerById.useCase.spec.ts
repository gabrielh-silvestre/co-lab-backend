import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';

import { WorkerFactory } from '@worker/domain/factory/Worker.factory';

import { FindWorkerByIdUseCase } from '@worker/app/useCase/findById/FindWorkerById.useCase';
import { WorkerNotFoundException } from '@worker/app/exception/WorkerNotFound.exception';

import { mockWorkerRepository } from '@utils/mocks';

const WORKER = WorkerFactory.createMany(1)[0];

describe('[Application][Unit] Tests for FindWorkerByIdUseCase', () => {
  let useCase: FindWorkerByIdUseCase;

  let repo: IWorkerRepository;

  beforeEach(() => {
    repo = mockWorkerRepository;

    useCase = new FindWorkerByIdUseCase(repo);
  });

  it('should create a FindWorkerByIdUseCase', () => {
    expect(useCase).toBeDefined();
    expect(useCase).toBeInstanceOf(FindWorkerByIdUseCase);
  });

  it('should find a worker by id', async () => {
    repo.findById = jest.fn().mockResolvedValue(WORKER);
    await useCase.execute({ id: '1' });

    expect(repo.findById).toBeCalledTimes(1);
  });

  it('should throw an error if worker not found', async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    const act = async () => await useCase.execute({ id: '1' });

    try {
      await act();
      fail('should throw an error');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(WorkerNotFoundException);
      expect(error.toHttp()).toBe(404);
    }
  });
});
