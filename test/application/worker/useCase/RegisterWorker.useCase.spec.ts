import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';
import type { ITestInput } from '@utils/types';

import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { WorkerApplicationException } from '@worker/app/exception/WorkerApplication.excpetion';

import {
  WORKER,
  WORKER_INPUT,
  mockWorkerEventEmitter,
  mockWorkerRepository,
} from '@utils/mocks';

const REGISTER_INVALID_INPUTS: ITestInput<Record<string, boolean>>[] = [
  {
    meta: {
      title: 'worker id already exists',
      expected: 'Worker already exists',
    },
    data: { id: true, email: false },
  },
  {
    meta: {
      title: 'worker email already exists',
      expected: 'Worker already exists',
    },
    data: { id: false, email: true },
  },
  {
    meta: {
      title: 'worker id and email already exists',
      expected: 'Worker already exists',
    },
    data: { id: true, email: true },
  },
];

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
    repo.existsById = jest.fn().mockResolvedValue(null);
    repo.existsByEmail = jest.fn().mockResolvedValue(null);
    const dto = WORKER_INPUT;

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(emitter.emit).toHaveBeenCalledTimes(1);

    const eventName = jest.mocked(emitter).emit.mock.calls[0][0].name;
    expect(eventName).toBe('WorkerRegistered');
  });

  it.each(REGISTER_INVALID_INPUTS)(
    'should throw an error when $meta.title',
    async ({ meta, data }) => {
      repo.existsById = jest.fn().mockResolvedValue(data.id);
      repo.existsByEmail = jest.fn().mockResolvedValue(data.email);
      const dto = WORKER;

      const act = async () => await useCase.execute(dto);

      try {
        await act();
      } catch (error) {
        expect(error).toBeInstanceOf(WorkerApplicationException);
        expect(error.message).toContain(meta.expected);
      }
    },
  );
});
