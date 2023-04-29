import type { ICompany, ICompanyProps } from './Company.interface';
import type {
  IEvaluation,
  IEvaluationProps,
} from '@evaluation/domain/entity/Evaluation.interface';

import {
  CreateEvaluationProps,
  EvaluationFactory,
} from '@evaluation/domain/factory/Evaluation.factory';
import { CompanyValidatorFactory } from '../factory/CompanyValidator.factory';

export class Company implements ICompany {
  private readonly props: ICompanyProps;

  private readonly _evaluations: IEvaluation[];

  constructor(
    id: string,
    name: string,
    evaluations: IEvaluation[],
    createdAt: Date,
    updatedAt: Date,
    description?: string,
    image?: string,
  ) {
    this.props = {
      id,
      name,
      description,
      image,
      evaluations: evaluations.map((evaluation) => evaluation.toObject()),
      createdAt,
      updatedAt,
    };

    this._evaluations = evaluations;

    this.validate();
  }

  private validate(): void {
    CompanyValidatorFactory.create().validate(this.props);
  }

  getRating(): number {
    if (this._evaluations.length === 0) return 0;

    const total = this._evaluations.reduce((acc, evaluation) => {
      return acc + evaluation.getRating();
    }, 0);

    return total / this._evaluations.length;
  }

  addEvaluation(evaluation: CreateEvaluationProps): void {
    const newEvaluation = EvaluationFactory.create(evaluation);

    this._evaluations.push(newEvaluation);
    this.props.evaluations.push(newEvaluation.toObject());
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get image(): string | null {
    return this.props.image ?? null;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get evaluations(): IEvaluationProps[] {
    return this.props.evaluations;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toObject(): ICompanyProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
