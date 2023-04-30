import type { ICompany } from '../entity/Company.interface';

import { CompanyCreatedEvent } from '../event/CompanyCreated.event';
import { EvaluationAddedEvent } from '../event/EvaluationAdded.event';

export class CompanyEventFactory {
  static created(company: ICompany): CompanyCreatedEvent {
    return new CompanyCreatedEvent(company.toObject());
  }

  static evaluationAdded(company: ICompany): EvaluationAddedEvent {
    return new EvaluationAddedEvent(company.toObject());
  }
}
