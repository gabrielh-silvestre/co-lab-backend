import { randomUUID } from 'node:crypto';

import type { ITestInput } from '@utils/types';
import type { ICompany } from '@company/domain/entity/Company.interface';
import type { IEvaluation } from '@evaluation/domain/entity/Evaluation.interface';

import { Company } from '@company/domain/entity/Company';
import { EvaluationFactory } from '@evaluation/domain/factory/Evaluation.factory';

const UUID = randomUUID();

const SUCCESS_COMPANY_CREATE: ITestInput<ICompany>[] = [
  {
    meta: { title: 'with description and image', expected: 'string' },
    data: new Company(
      UUID,
      'name',
      [],
      new Date(),
      new Date(),
      'description',
      'image',
    ),
  },
  {
    meta: { title: 'without description and image', expected: 'object' }, // object => null
    data: new Company(UUID, 'name', [], new Date(), new Date(), null, null),
  },
];

describe('[Domain][Unit] Tests for Company', () => {
  it.each(SUCCESS_COMPANY_CREATE)(
    'should create a Company $meta.title',
    ({ meta, data }) => {
      expect(typeof data.id).toBe('string');
      expect(typeof data.name).toBe('string');
      expect(typeof data.description).toBe(meta.expected);
      expect(typeof data.image).toBe(meta.expected);
      expect(Array.isArray(data.evaluations)).toBe(true);

      expect(data.createdAt).toBeInstanceOf(Date);
      expect(data.updatedAt).toBeInstanceOf(Date);
    },
  );

  it('should convert Company to plain object', () => {
    const timestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    const company = new Company(
      UUID,
      'name',
      [],
      new Date(),
      new Date(),
      'description',
      'image',
    );

    const companyObject = company.toObject();

    expect(typeof companyObject.id).toBe('string');
    expect(typeof companyObject.name).toBe('string');
    expect(typeof companyObject.description).toBe('string');
    expect(typeof companyObject.image).toBe('string');
    expect(Array.isArray(companyObject.evaluations)).toBe(true);

    expect(companyObject.createdAt).toMatch(timestampPattern);
    expect(companyObject.updatedAt).toMatch(timestampPattern);
  });

  it('should calculate the rating', () => {
    const evaluations: IEvaluation[] = [
      {
        getRating() {
          return 2;
        },
        toObject() {
          return {};
        },
      },
      {
        getRating() {
          return 4;
        },
        toObject() {
          return {};
        },
      },
    ] as unknown as IEvaluation[];
    const company = new Company(
      UUID,
      'name',
      evaluations,
      new Date(),
      new Date(),
      'description',
      'image',
    );

    expect(company.getRating()).toBe(3); // (2 + 4) / 2
  });

  it('should add a new evaluation', () => {
    const company = new Company(
      UUID,
      'name',
      [],
      new Date(),
      new Date(),
      'description',
      'image',
    );

    const [evaluation] = EvaluationFactory.createMany(1);
    company.addEvaluation(evaluation);

    expect(company.evaluations.length).toBe(1);
  });
});
