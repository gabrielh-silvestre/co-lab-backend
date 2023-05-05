import { Worker } from '../entity/Worker';

import { WorkerRegisteredEvent } from '../event/WorkerRegistered.event';
import { WorkerChangedNameEvent } from '../event/WorkerChangedName.event';
import { WorkerChangedAgeEvent } from '../event/WorkerChangedAge.even';
import { WorkerChangedSalaryEvent } from '../event/WorkerChangedSalary.event';

export class WorkerEventFactory {
  static registered(worker: Worker): WorkerRegisteredEvent {
    return new WorkerRegisteredEvent(worker.toObject());
  }

  static changedName(worker: Worker): WorkerChangedNameEvent {
    return new WorkerChangedNameEvent(worker.toObject());
  }

  static changedAge(worker: Worker): WorkerChangedAgeEvent {
    return new WorkerChangedAgeEvent(worker.toObject());
  }

  static changedSalary(worker: Worker): WorkerChangedSalaryEvent {
    return new WorkerChangedSalaryEvent(worker.toObject());
  }
}
