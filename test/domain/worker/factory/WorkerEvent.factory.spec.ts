import { WorkerRegisteredEvent } from '@worker/domain/event/WorkerRegistered.event';
import { WorkerChangedNameEvent } from '@worker/domain/event/WorkerChangedName.event';
import { WorkerChangedAgeEvent } from '@worker/domain/event/WorkerChangedAge.even';
import { WorkerChangedSalaryEvent } from '@worker/domain/event/WorkerChangedSalary.event';

import { WorkerFactory } from '@worker/domain/factory/Worker.factory';
import { WorkerEventFactory } from '@worker/domain/factory/WorkerEvent.factory';

describe('[Domain][Unit] Tests for WorkerEventFactory', () => {
  it('should create a WorkerRegisteredEvent', () => {
    const worker = WorkerFactory.createMany(1)[0];

    const event = WorkerEventFactory.registered(worker);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(WorkerRegisteredEvent);
  });

  it('should create a WorkerChangedNameEvent', () => {
    const worker = WorkerFactory.createMany(1)[0];

    const event = WorkerEventFactory.changedName(worker);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(WorkerChangedNameEvent);
  });

  it('should create a WorkerChangedAgeEvent', () => {
    const worker = WorkerFactory.createMany(1)[0];

    const event = WorkerEventFactory.changedAge(worker);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(WorkerChangedAgeEvent);
  });

  it('should create a WorkerChangedSalaryEvent', () => {
    const worker = WorkerFactory.createMany(1)[0];

    const event = WorkerEventFactory.changedSalary(worker);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(WorkerChangedSalaryEvent);
  });
});
