import type { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { InfraException } from '@shared/infra/exception/Infra.exception';
import { SharedExceptionFilter } from './SharedException.filter';

@Catch(InfraException)
export class InfraExceptionFilter
  extends SharedExceptionFilter
  implements ExceptionFilter<InfraException>
{
  catch(exception: InfraException, host: ArgumentsHost) {
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
