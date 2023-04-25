import { randomUUID } from 'node:crypto';

import type { IEvent } from './Event.interface';

export abstract class Event<T> implements IEvent<T> {
  readonly id: string;

  readonly name: string;

  readonly payload: T;

  readonly occurredAt: Date;

  readonly updatedAt: Date;

  constructor(name: string, payload: T) {
    this.id = randomUUID();
    this.name = name;
    this.payload = payload;
    this.occurredAt = new Date();
    this.updatedAt = new Date();
  }
}
