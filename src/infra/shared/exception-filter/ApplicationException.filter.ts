import type { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ApplicationException } from '@shared/app/exception/Application.exception';
import { SharedExceptionFilter } from './SharedException.filter';

@Catch(ApplicationException)
export class ApplicationExceptionFilter
  extends SharedExceptionFilter
  implements ExceptionFilter<ApplicationException>
{
  catch(exception: ApplicationException, host: ArgumentsHost) {
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
