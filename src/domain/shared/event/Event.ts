import { randomUUID } from 'node:crypto';

import type { IEvent } from './Event.interface';

export abstract class Event<T> implements IEvent<T> {
  private readonly _id: string;

  private readonly _name: string;

  private readonly _payload: T;

  private readonly _occurredAt: Date;

  private readonly _updatedAt: Date;

  constructor(name: string, payload: T) {
    this._id = randomUUID();
    this._name = name;
    this._payload = payload;
    this._occurredAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get payload(): T {
    return this._payload;
  }

  get occurredAt(): Date {
    return this._occurredAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
