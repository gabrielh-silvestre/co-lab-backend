import { Event } from '@shared/domain/event/Event';

import type { ICompanyProps } from '../entity/Company.interface';

export class EvaluationAddedEvent extends Event<ICompanyProps> {
  constructor(payload: ICompanyProps) {
    super('EvaluationAdded', payload);
  }
}
