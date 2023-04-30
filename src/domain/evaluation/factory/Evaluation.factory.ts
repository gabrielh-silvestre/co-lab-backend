import { randomUUID } from 'node:crypto';

import type { IEvaluationProps } from '../entity/Evaluation.interface';

import { Evaluation } from '../entity/Evaluation';
import { CategoryFactory } from '../value-object/category/Category.factory';

export type CreateEvaluationProps = {
  companyId: string;
  workerId: string;
  comment?: string;
  categories: {
    name: string;
    rating: number;
  }[];
};

export class EvaluationFactory {
  static create(props: CreateEvaluationProps): Evaluation {
    const categories = props.categories.map(CategoryFactory.create);

    return new Evaluation(
      randomUUID(),
      props.companyId,
      props.workerId,
      categories,
      new Date(),
      new Date(),
      props.comment ?? null,
    );
  }

  static createFromPersistence(props: IEvaluationProps): Evaluation {
    return new Evaluation(
      props.id,
      props.companyId,
      props.workerId,
      props.categories.map(CategoryFactory.createFromPersistence),
      props.createdAt,
      props.updatedAt,
      props.comment,
    );
  }

  static createMany(n: number): Evaluation[] {
    return Array.from({ length: n }, () => {
      const companyId = randomUUID();
      const workerId = randomUUID();
      const comment = 'comment';
      const categories = CategoryFactory.createMany(1)[0];

      return new Evaluation(
        randomUUID(),
        companyId,
        workerId,
        categories,
        new Date(),
        new Date(),
        comment,
      );
    });
  }
}
