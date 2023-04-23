import { CustomException } from '@utils/errors/Custom.exception';

export abstract class DomainException extends CustomException {
  constructor(message: string, cause?: Error) {
    super(`[DomainException] ${message}`, cause);
  }
}
