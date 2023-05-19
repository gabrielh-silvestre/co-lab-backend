import type { IEntity } from '@shared/domain/entity/Entity.interface';

export type CategoryName =
  | 'diversidade'
  | 'inclusão'
  | 'equidade'
  | 'benefícios';

export interface ICategoryProps {
  get id(): string;
  get name(): CategoryName;
  get rating(): number;
}

export interface ICategory extends ICategoryProps, IEntity<ICategoryProps> {}
