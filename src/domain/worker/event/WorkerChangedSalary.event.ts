import type { IWorkerProps } from '../entity/Worker.interface';

import { Event } from '@shared/domain/event/Event';

export class WorkerChangedSalaryEvent extends Event<IWorkerProps> {
  constructor(payload: IWorkerProps) {
    super('WorkerChangedAge', payload);
  }
}
