import type {
  ICategory,
  ICategoryProps,
} from '../value-object/category/Category.interface';
import type { IEvaluation, IEvaluationProps } from './Evaluation.interface';

import { EvaluationValidatorFactory } from '../factory/EvaluationValidator.factory';

export class Evaluation implements IEvaluation {
  private readonly props: IEvaluationProps;

  private readonly _categories: ICategory[];

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
      categories: categories.map((category) => category.toObject()),
      createdAt,
      updatedAt,
    };
    this._categories = categories;

    this.validate();
  }

  private validate(): void {
    EvaluationValidatorFactory.create().validate(this.props);
  }

  getRating(): number {
    const ratings = this._categories.map((category) => category.rating);
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

  get categories(): ICategoryProps[] {
    return this.props.categories;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public toObject(): IEvaluationProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
