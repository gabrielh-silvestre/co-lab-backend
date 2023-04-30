import { HttpStatus } from '@nestjs/common';

import { ApplicationException } from '@shared/app/exception/Application.exception';

export class CompanyNotFoundException extends ApplicationException {
  constructor(cause?: Error) {
    super('Company not found', cause);
  }

  toHttp(): number {
    return HttpStatus.NOT_FOUND;
  }
}
