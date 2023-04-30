import type { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { CustomException } from '@utils/errors/Custom.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter<unknown> {
  protected normalizeErrorMessage(message: string): string {
    // remove the "[XXXException] " prefix from the message
    return message.replace(/^\[.*\] /, '');
  }

  private mountBody(statusCode: number, message: string, request: Request) {
    return {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let body = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Internal server error',
    };

    if (exception instanceof CustomException) {
      body = this.mountBody(
        exception.toHttp(),
        this.normalizeErrorMessage(exception.message),
        request,
      );
    }

    if (exception instanceof HttpException) {
      body = this.mountBody(exception.getStatus(), exception.message, request);
    }

    response.status(body.statusCode).json(body);

    if (body.statusCode >= 500) {
      console.error(exception);
    }
  }
}
