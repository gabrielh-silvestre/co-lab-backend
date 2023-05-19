import type {
  CategoryName,
  ICategory,
  ICategoryProps,
} from './Category.interface';

import { EvaluationValidationException } from '../../exception/Validation.exception';

export class Category implements ICategory {
  private static readonly VALID_NAMES: CategoryName[] = [
    'diversidade',
    'inclusão',
    'equidade',
    'benefícios',
  ];

  private readonly props: ICategoryProps;

  constructor(id: string, name: CategoryName, rating: number) {
    this.props = {
      id,
      name,
      rating,
    };

    this.validate();
  }

  private validate(): void {
    if (!Category.VALID_NAMES.includes(this.props.name)) {
      const validNames = Category.VALID_NAMES.join(', ');
      throw new EvaluationValidationException(
        `Category name must be one of the following: [${validNames}]`,
      );
    }

    if (this.rating < 1 || this.rating > 10) {
      throw new EvaluationValidationException(
        'Rating must be between 1 and 10',
      );
    }
  }

  get id(): string {
    return this.props.id;
  }

  get name(): CategoryName {
    return this.props.name;
  }

  get rating(): number {
    return this.props.rating;
  }

  toObject(): ICategoryProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
