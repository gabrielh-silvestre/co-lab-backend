import { Inject, Injectable } from '@nestjs/common';

import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';
import type {
  InputRegisterWorkerDto,
  OutputRegisterWorkerDto,
} from './RegisterWorker.dto';

import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerEventFactory } from '@worker/domain/factory/WorkerEvent.factory';

import { WorkerAlreadyExistsException } from '@worker/app/exception/WorkerAlreadyExists.exception';

import { WORKER_EVENT_EMITTER, WORKER_REPOSITORY } from '@utils/constants';

@Injectable()
export class RegisterWorkerUseCase {
  constructor(
    @Inject(WORKER_REPOSITORY) private readonly repo: IWorkerRepository,
    @Inject(WORKER_EVENT_EMITTER) private readonly emitter: IEventEmitter,
  ) {}

  private async alreadyExists(
    id: string,
    email: string,
  ): Promise<void | never> {
    const existsById = await this.repo.existsById(id);
    const existsByEmail = await this.repo.existsByEmail(email);

    if (existsById || existsByEmail) {
      throw new WorkerAlreadyExistsException();
    }
  }

  async execute(dto: InputRegisterWorkerDto): Promise<OutputRegisterWorkerDto> {
    await this.alreadyExists(dto.id, dto.email);

    const worker = WorkerFactory.create(dto);
    await this.repo.create(worker);

    const registerEvent = WorkerEventFactory.registered(worker);
    await this.emitter.emit(registerEvent);

    return worker.toObject();
  }
}
