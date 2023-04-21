import { DomainException } from '@shared/domain/exception/Domain.exception';

export class WorkerDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
