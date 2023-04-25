import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class SharedExceptionFilter implements ExceptionFilter<Error> {
  protected normalizeErrorMessage(message: string): string {
    // remove the "[XXXException] " prefix from the message
    return message.replace(/^\[.*\] /, '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(_exception: Error, _host: ArgumentsHost) {
    throw new Error('Method not implemented.');
  }
}
