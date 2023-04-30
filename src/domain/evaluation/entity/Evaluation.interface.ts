import type { IEntity } from '@shared/domain/entity/Entity.interface';
import type { ICategory } from '../value-object/category/Category.interface';

export interface IEvaluationProps {
  get id(): string;
  get workerId(): string;
  get companyId(): string;

  get comment(): string | null;
  get categories(): ICategory[];

  get createdAt(): Date;
  get updatedAt(): Date;
}

export interface IEvaluation
  extends IEvaluationProps,
    IEntity<IEvaluationProps> {
  getRating(): number;
}
