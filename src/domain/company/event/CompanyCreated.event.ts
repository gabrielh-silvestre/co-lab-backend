import { Event } from '@shared/domain/event/Event';

import type { ICompanyProps } from '../entity/Company.interface';

export class CompanyCreatedEvent extends Event<ICompanyProps> {
  constructor(payload: ICompanyProps) {
    super('CompanyCreated', payload);
  }
}
