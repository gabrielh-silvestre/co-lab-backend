import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@shared/domain/exception/Domain.exception';

export class EvaluationValidationException extends DomainException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }

  toHttp(): number {
    return HttpStatus.BAD_REQUEST;
  }
}
