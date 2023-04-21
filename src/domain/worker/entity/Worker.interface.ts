import type { IEntity } from '@shared/domain/entity/Entity.interface';

export interface IWorkerProps {
  get id(): string;
  get name(): string;
  get email(): string;
  get age(): number;
  get salary(): number;
  get createdAt(): Date;
  get updatedAt(): Date;
}

export interface IWorker extends IWorkerProps, IEntity<IWorkerProps> {}
