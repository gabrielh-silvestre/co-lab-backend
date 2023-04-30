import type { IEntity } from '@shared/domain/entity/Entity.interface';

export type CategoryName =
  | 'diversidade'
  | 'inclusão'
  | 'equidade'
  | 'liderança';

export interface ICategoryProps {
  get id(): string;
  get name(): CategoryName;
  get rating(): number;
}

export interface ICategory extends ICategoryProps, IEntity<ICategoryProps> {}
