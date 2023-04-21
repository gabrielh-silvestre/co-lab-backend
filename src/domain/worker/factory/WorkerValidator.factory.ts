import type { IWorkerValidator } from '../validator/Worker.validator.interface';

import { WorkerJoiValidator } from '../validator/joi/WorkerJoi.validator';

export class WorkerValidatorFactory {
  static create(): IWorkerValidator {
    return new WorkerJoiValidator();
  }
}
