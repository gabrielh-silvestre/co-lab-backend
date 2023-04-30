import type { IEntity } from '@shared/domain/entity/Entity.interface';
import type { IEvaluation } from '@evaluation/domain/entity/Evaluation.interface';
import type { CreateEvaluationProps } from '@evaluation/domain/factory/Evaluation.factory';

export interface ICompanyProps {
  get id(): string;
  get name(): string;
  get image(): string | null;
  get description(): string | null;

  get evaluations(): IEvaluation[];

  get createdAt(): Date;
  get updatedAt(): Date;
}

export interface ICompany extends ICompanyProps, IEntity<ICompanyProps> {
  getRating(): number;
  addEvaluation(evaluation: CreateEvaluationProps): void;
}
