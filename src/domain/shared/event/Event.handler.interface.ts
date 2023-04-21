import type { IEvent } from './Event.interface';

export interface IEventHandler<T extends IEvent<unknown>> {
  handle(event: T): Promise<void>;
}
