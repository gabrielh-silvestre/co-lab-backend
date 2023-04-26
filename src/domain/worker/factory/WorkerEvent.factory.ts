import { Worker } from '../entity/Worker';
import { WorkerRegisteredEvent } from '../event/WorkerRegistered.event';

export class WorkerEventFactory {
  static registered(worker: Worker): WorkerRegisteredEvent {
    return new WorkerRegisteredEvent(worker.toObject());
  }
}
