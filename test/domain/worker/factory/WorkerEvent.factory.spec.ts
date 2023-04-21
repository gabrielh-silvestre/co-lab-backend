import { WorkerRegisteredEvent } from '@worker/domain/event/WorkerRegistered.event';

import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerEventFactory } from '@worker/domain/factory/WorkerEvent.factory';

describe('[Domain][Unit] Tests for WorkerEventFactory', () => {
  it('should create a WorkerRegisteredEvent', () => {
    const worker = WorkerFactory.createMany(1)[0];

    const event = WorkerEventFactory.registered(worker);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(WorkerRegisteredEvent);
  });
});
