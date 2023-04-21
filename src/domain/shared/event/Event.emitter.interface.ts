import type { IEventHandler } from './Event.handler.interface';
import type { IEvent } from './Event.interface';

export interface IEventEmitter {
  emit(event: IEvent<unknown>): Promise<void>;
  register<T extends IEvent<unknown>>(
    event: T,
    handler: IEventHandler<T>,
  ): Promise<void>;
  unregister<T extends IEvent<unknown>>(
    event: T,
    handler: IEventHandler<T>,
  ): Promise<void>;
  unregisterAll<T extends IEvent<unknown>>(event: T): Promise<void>;
}
