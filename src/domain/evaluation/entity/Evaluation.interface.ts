import type { IEntity } from '@shared/domain/entity/Entity.interface';
import type { ICategoryProps } from '../value-object/category/Category.interface';

export interface IEvaluationProps {
  get id(): string;
  get workerId(): string;
  get companyId(): string;

  get comment(): string | null;
  get categories(): ICategoryProps[];

  get createdAt(): Date;
  get updatedAt(): Date;
}

export interface IEvaluation
  extends IEvaluationProps,
    IEntity<IEvaluationProps> {}
