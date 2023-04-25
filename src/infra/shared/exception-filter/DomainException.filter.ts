import type { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { DomainException } from '@shared/domain/exception/Domain.exception';
import { SharedExceptionFilter } from './SharedException.filter';

@Catch(DomainException)
export class DomainExceptionFilter
  extends SharedExceptionFilter
  implements ExceptionFilter<DomainException>
{
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.toHttp();

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: this.normalizeErrorMessage(exception.message),
    });
  }
}
