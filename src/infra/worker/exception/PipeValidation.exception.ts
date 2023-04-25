import { HttpStatus } from '@nestjs/common';

import { InfraException } from '@shared/infra/exception/Infra.exception';

export class PipeValidationException extends InfraException {
  constructor(message: string, cause?: Error) {
    super(`[WorkerException] ${message}`, cause);
  }

  toHttp(): number {
    return HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
