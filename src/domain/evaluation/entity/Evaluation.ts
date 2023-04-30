import type { ICategory } from '../value-object/category/Category.interface';
import type { IEvaluation, IEvaluationProps } from './Evaluation.interface';

import { EvaluationValidatorFactory } from '../factory/EvaluationValidator.factory';

export class Evaluation implements IEvaluation {
  private readonly props: IEvaluationProps;

  constructor(
    id: string,
    workerId: string,
    companyId: string,
    categories: ICategory[],
    createdAt: Date,
    updatedAt: Date,
    comment?: string,
  ) {
    this.props = {
      id,
      workerId,
      companyId,
      comment,
      categories,
      createdAt,
      updatedAt,
    };

    this.validate();
  }

  private validate(): void {
    EvaluationValidatorFactory.create().validate(this.toObject());
  }

  getRating(): number {
    const ratings = this.props.categories.map((category) => category.rating);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = total / ratings.length;

    return average;
  }

  get id(): string {
    return this.props.id;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get workerId(): string {
    return this.props.workerId;
  }

  get comment(): string | null {
    return this.props.comment ?? null;
  }

  get categories(): ICategory[] {
    return this.props.categories;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public toObject(): IEvaluationProps {
    const { categories, ...props } = this.props;

    return JSON.parse(
      JSON.stringify({
        ...props,
        categories: categories.map((category) => category.toObject()),
      }),
    );
  }
}
