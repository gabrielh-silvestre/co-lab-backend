import { HttpStatus } from '@nestjs/common';

import { ApplicationException } from '@shared/app/exception/Application.exception';

export class WorkerNotFoundException extends ApplicationException {
  constructor(cause?: Error) {
    super('Worker not found', cause);
  }

  toHttp(): number {
    return HttpStatus.NOT_FOUND;
  }
}
