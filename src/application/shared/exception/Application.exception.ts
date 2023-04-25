import { CustomException } from '@utils/errors/Custom.exception';

export abstract class ApplicationException extends CustomException {
  constructor(message: string, cause?: Error) {
    super(`[ApplicationException] ${message}`, cause);
  }
}
