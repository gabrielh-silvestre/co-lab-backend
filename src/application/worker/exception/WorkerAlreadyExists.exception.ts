import { HttpStatus } from '@nestjs/common';

import { ApplicationException } from '@shared/app/exception/Application.exception';

export class WorkerAlreadyExistsException extends ApplicationException {
  constructor(cause?: Error) {
    super('Worker already exists', cause);
  }

  toHttp(): number {
    return HttpStatus.CONFLICT;
  }
}
