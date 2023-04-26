import { Event } from '@shared/domain/event/Event';

import type { IWorkerProps } from '../entity/Worker.interface';

export class WorkerRegisteredEvent extends Event<IWorkerProps> {
  constructor(payload: IWorkerProps) {
    super('WorkerRegistered', payload);
  }
}
