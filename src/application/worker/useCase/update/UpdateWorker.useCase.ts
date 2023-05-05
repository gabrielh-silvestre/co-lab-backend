import { Inject, Injectable } from '@nestjs/common';

import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';
import type {
  InputUpdateWorkerDto,
  OutputUpdateWorkerDto,
} from './UpdateWorker.dto';

import { Worker } from '@worker/domain/entity/Worker';
import { WorkerService } from '@worker/domain/service/Worker.service';
import { WorkerNotFoundException } from '@worker/app/exception/WorkerNotFound.exception';

import { WORKER_REPOSITORY } from '@utils/constants';

@Injectable()
export class UpdateWorkerUseCase {
  constructor(
    @Inject(WORKER_REPOSITORY) private readonly repo: IWorkerRepository,
    private readonly service: WorkerService,
  ) {}

  private async findWorker(id: string): Promise<Worker> {
    const worker = await this.repo.findById(id);
    if (!worker) throw new WorkerNotFoundException();

    return worker;
  }

  async execute(dto: InputUpdateWorkerDto): Promise<OutputUpdateWorkerDto> {
    const { id, ...props } = dto;

    const worker = await this.findWorker(id);

    this.service.update(worker, props);
    await this.repo.update(worker);

    return worker.toObject();
  }
}
