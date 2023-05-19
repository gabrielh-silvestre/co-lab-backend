import { randomUUID } from 'node:crypto';

import type { ITestInput } from '@utils/types';

import { Evaluation } from '@evaluation/domain/entity/Evaluation';
import { CategoryFactory } from '@evaluation/category/Category.factory';

import { TIMESTPAMP_PATTERN } from '@utils/mocks';

const UUID = randomUUID();
const CATEGORIES = CategoryFactory.createMany(1)[0];

const SUCCESS_EVALUATION_CREATE: ITestInput<Evaluation>[] = [
  {
    meta: { title: 'with comment', expected: 'string' },
    data: new Evaluation(
      UUID,
      UUID,
      UUID,
      CATEGORIES,
      new Date(),
      new Date(),
      'comment',
    ),
  },
  {
    meta: { title: 'without comment', expected: 'object' }, // object => null
    data: new Evaluation(UUID, UUID, UUID, CATEGORIES, new Date(), new Date()),
  },
];

describe('[Domain][Unit] Tests for Evaluation', () => {
  it.each(SUCCESS_EVALUATION_CREATE)(
    'should create a Evaluation $meta.title',
    ({ meta, data }) => {
      expect(typeof data.id).toBe('string');
      expect(typeof data.companyId).toBe('string');
      expect(typeof data.workerId).toBe('string');

      expect(typeof data.comment).toBe(meta.expected);
      expect(Array.isArray(data.categories)).toBe(true);

      expect(data.createdAt).toBeInstanceOf(Date);
      expect(data.updatedAt).toBeInstanceOf(Date);
    },
  );

  it('should convert Evaluation to plain object', () => {
    const evaluation = new Evaluation(
      UUID,
      UUID,
      UUID,
      CATEGORIES,
      new Date(),
      new Date(),
      'comment',
    );

    const evaluationObject = evaluation.toObject();

    expect(typeof evaluationObject.id).toBe('string');
    expect(typeof evaluationObject.companyId).toBe('string');
    expect(typeof evaluationObject.workerId).toBe('string');

    expect(typeof evaluationObject.comment).toBe('string');
    expect(Array.isArray(evaluationObject.categories)).toBe(true);

    expect(evaluationObject.createdAt).toMatch(TIMESTPAMP_PATTERN);
    expect(evaluationObject.updatedAt).toMatch(TIMESTPAMP_PATTERN);
  });

  it('should calc and return the rating', () => {
    const categories = [
      CategoryFactory.createFromPersistence({
        id: UUID,
        name: 'diversidade',
        rating: 2,
      }),
      CategoryFactory.createFromPersistence({
        id: UUID,
        name: 'equidade',
        rating: 3,
      }),
      CategoryFactory.createFromPersistence({
        id: UUID,
        name: 'crescimento',
        rating: 4,
      }),
      CategoryFactory.createFromPersistence({
        id: UUID,
        name: 'benefícios',
        rating: 5,
      }),
    ];
    const evaluation = new Evaluation(
      UUID,
      UUID,
      UUID,
      categories,
      new Date(),
      new Date(),
      'comment',
    );

    const rating = evaluation.getRating();

    expect(typeof rating).toBe('number');
    expect(rating).toBe(3.5);
  });
});
