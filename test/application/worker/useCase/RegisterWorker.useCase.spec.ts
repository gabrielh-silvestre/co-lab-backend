import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';

import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { WorkerApplicationException } from '@worker/app/exception/WorkerApplication.excpetion';

import {
  WORKER_INPUT,
  mockWorkerEventEmitter,
  mockWorkerRepository,
} from '@utils/mocks';

describe('[Application][Unit] Tests for RegisterWorkerUseCase', () => {
  let useCase: RegisterWorkerUseCase;

  let repo: IWorkerRepository;

  let emitter: IEventEmitter;

  beforeEach(() => {
    repo = mockWorkerRepository;
    emitter = mockWorkerEventEmitter;

    useCase = new RegisterWorkerUseCase(repo, emitter);
  });

  it('should create a RegisterWorkerUseCase', () => {
    expect(useCase).toBeInstanceOf(RegisterWorkerUseCase);
  });

  it('should register a worker', async () => {
    repo.findById = jest.fn().mockResolvedValue(null);
    repo.findByEmail = jest.fn().mockResolvedValue(null);
    const dto = WORKER_INPUT;

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(emitter.emit).toHaveBeenCalledTimes(1);

    const eventName = jest.mocked(emitter).emit.mock.calls[0][0].name;
    expect(eventName).toBe('WorkerRegistered');
  });

  it('should throw an error if worker already exists', async () => {
    repo.findById = jest.fn().mockResolvedValue({});
    repo.findByEmail = jest.fn().mockResolvedValue({});
    const dto = WORKER_INPUT;

    const act = async () => await useCase.execute(dto);

    try {
      await act();
    } catch (error) {
      expect(error).toBeInstanceOf(WorkerApplicationException);
      expect(error.message).toContain('Worker already exists');
    }
  });
});
