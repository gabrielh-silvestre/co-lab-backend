import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';

import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerService } from '@worker/domain/service/Worker.service';
import { UpdateWorkerUseCase } from '@worker/app/useCase/update/UpdateWorker.useCase';

import { mockWorkerRepository } from '@utils/mocks';
import { WorkerNotFoundException } from '@worker/app/exception/WorkerNotFound.exception';

const COMPANY = WorkerFactory.createMany(1)[0];

describe('[Application][Unit] Tests for UpdateWorkerUseCase', () => {
  let useCase: UpdateWorkerUseCase;

  let repo: IWorkerRepository;

  let service: WorkerService;

  beforeEach(() => {
    repo = mockWorkerRepository;
    service = { update: jest.fn() } as unknown as WorkerService;

    useCase = new UpdateWorkerUseCase(repo, service);
  });

  it('should create a UpdateWorkerUseCase', () => {
    expect(useCase).toBeDefined();
    expect(useCase).toBeInstanceOf(UpdateWorkerUseCase);
  });

  it('should update a worker', async () => {
    repo.findById = jest.fn().mockResolvedValue(COMPANY);
    const props = { name: 'new name' };
    const dto = { id: COMPANY.id, ...props };

    await useCase.execute(dto);

    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(COMPANY, props);

    expect(repo.update).toHaveBeenCalledTimes(1);
    expect(repo.update).toHaveBeenCalledWith(COMPANY);
  });

  it('should throw an error when worker not found', async () => {
    repo.findById = jest.fn().mockResolvedValue(null);
    const dto = { id: COMPANY.id, name: 'new name' };

    const act = async () => await useCase.execute(dto);

    try {
      await act();
      fail('should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(WorkerNotFoundException);
      expect(error.toHttp()).toBe(404);
    }
  });
});
