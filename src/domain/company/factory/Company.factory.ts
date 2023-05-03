import { randomUUID } from 'node:crypto';

import type { ICompanyProps } from '../entity/Company.interface';
import type { IEvaluation } from '@evaluation/domain/entity/Evaluation.interface';

import { Company } from '../entity/Company';
import { EvaluationFactory } from '@evaluation/domain/factory/Evaluation.factory';

export interface CreateCompanyProps {
  name: string;
  description?: string;
  image?: string;
}

export class CompanyFactory {
  static create({
    name,
    description = null,
    image = null,
  }: CreateCompanyProps): Company {
    return new Company(
      randomUUID(),
      name,
      [],
      new Date(),
      new Date(),
      description,
      image,
    );
  }

  static createFromPersistence(props: ICompanyProps): Company {
    return new Company(
      props.id,
      props.name,
      props.evaluations.map(EvaluationFactory.createFromPersistence),
      props.createdAt,
      props.updatedAt,
      props.description,
      props.image,
    );
  }

  static createMany(n: number, evaluations: IEvaluation[]): Company[] {
    return Array.from({ length: n }, () => {
      const UUID = randomUUID();

      const name = `company-${UUID}`;
      const description = `description ${UUID}`;
      const image = `https://test-images.com/${UUID}.png`;

      return new Company(
        UUID,
        name,
        evaluations,
        new Date(),
        new Date(),
        description,
        image,
      );
    });
  }
}
