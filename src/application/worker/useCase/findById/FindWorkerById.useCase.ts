import { Inject, Injectable } from '@nestjs/common';

import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';
import type {
  InputFindWorkerByIdDto,
  OutputFindWorkerByIdDto,
} from './FindWorkerById.dto';

import { WorkerNotFoundException } from '@worker/app/exception/WorkerNotFound.exception';

import { WORKER_REPOSITORY } from '@utils/constants';

@Injectable()
export class FindWorkerByIdUseCase {
  constructor(
    @Inject(WORKER_REPOSITORY) private readonly repo: IWorkerRepository,
  ) {}

  async execute({
    id,
  }: InputFindWorkerByIdDto): Promise<OutputFindWorkerByIdDto> {
    const foundWorker = await this.repo.findById(id);
    if (!foundWorker) throw new WorkerNotFoundException();

    return foundWorker.toObject();
  }
}
