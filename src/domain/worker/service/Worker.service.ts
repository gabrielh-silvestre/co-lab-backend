import { Inject, Injectable } from '@nestjs/common';

import type { IWorker, IWorkerProps } from '../entity/Worker.interface';
import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';

import { WORKER_EVENT_EMITTER } from '@utils/constants';

@Injectable()
export class WorkerService {
  constructor(
    @Inject(WORKER_EVENT_EMITTER) private readonly emitter: IEventEmitter,
  ) {}

  update(worker: IWorker, props: Partial<IWorkerProps>): IWorker {
    const { name, age, salary } = props;

    if (name) worker.changeName(this.emitter, name);
    if (age) worker.changeAge(this.emitter, age);
    if (salary) worker.changeSalary(this.emitter, salary);

    return worker;
  }
}
