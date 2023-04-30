import type { ICompany, ICompanyProps } from './Company.interface';
import type { IEvaluation } from '@evaluation/domain/entity/Evaluation.interface';

import {
  CreateEvaluationProps,
  EvaluationFactory,
} from '@evaluation/domain/factory/Evaluation.factory';
import { CompanyValidatorFactory } from '../factory/CompanyValidator.factory';

export class Company implements ICompany {
  private readonly props: ICompanyProps;

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
      evaluations,
      createdAt,
      updatedAt,
    };

    this.validate();
  }

  private validate(): void {
    CompanyValidatorFactory.create().validate(this.toObject());
  }

  getRating(): number {
    if (this.props.evaluations.length === 0) return 0;

    const total = this.props.evaluations.reduce((acc, evaluation) => {
      return acc + evaluation.getRating();
    }, 0);

    return total / this.props.evaluations.length;
  }

  addEvaluation(evaluation: CreateEvaluationProps): void {
    const newEvaluation = EvaluationFactory.create(evaluation);

    this.props.evaluations.push(newEvaluation);
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

  get evaluations(): IEvaluation[] {
    return this.props.evaluations;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toObject(): ICompanyProps {
    const { evaluations, ...props } = this.props;

    return JSON.parse(
      JSON.stringify({
        ...props,
        evaluations: evaluations.map((evaluation) => evaluation.toObject()),
      }),
    );
  }
}
