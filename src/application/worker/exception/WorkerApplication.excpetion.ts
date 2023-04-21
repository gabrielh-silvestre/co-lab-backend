import { ApplicationException } from '@shared/app/exception/Application.exception';

export class WorkerApplicationException extends ApplicationException {
  constructor(message: string) {
    super(`[WorkerException] ${message}`);
  }
}
