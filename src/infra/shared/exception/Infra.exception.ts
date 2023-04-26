import { CustomException } from '@utils/errors/Custom.exception';

export abstract class InfraException extends CustomException {
  constructor(message: string, cause?: Error) {
    super(`[InfraException] ${message}`, cause);
  }
}
