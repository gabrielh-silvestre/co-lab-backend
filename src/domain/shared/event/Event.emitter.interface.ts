import type { IEventHandler } from './Event.handler.interface';
import type { IEvent } from './Event.interface';

export interface IEventEmitter {
  emit(event: IEvent<unknown>): Promise<void>;
  register<T extends IEvent<unknown>>(
    event: T,
    handler: IEventHandler<T>,
  ): void;
  unregister<T extends IEvent<unknown>>(
    event: T,
    handler: IEventHandler<T>,
  ): void;
  unregisterAll<T extends IEvent<unknown>>(event: T): void;
}
