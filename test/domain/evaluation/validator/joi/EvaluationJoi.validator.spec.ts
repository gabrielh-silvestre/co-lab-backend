import { fail } from 'assert';

import type { ITestInput } from '@utils/types';
import type { IEvaluationProps } from '@evaluation/domain/entity/Evaluation.interface';

import { EvaluationJoiValidator } from '@evaluation/domain/validator/joi/EvaluationJoi.validator';
import { EvaluationValidationException } from '@evaluation/domain/exception/Validation.exception';

import { EVALUATION } from '@utils/mocks';

const INVALID_EVALUATION_INPUTS: ITestInput<IEvaluationProps>[] = [
  {
    meta: {
      title: 'id is not a valid UUID',
      expected: 'id must be a valid UUID',
    },
    data: {
      ...EVALUATION,
      id: 'invalid-uuid',
    },
  },
  {
    meta: {
      title: 'companyId is not a valid UUID',
      expected: 'company "id" must be a valid UUID',
    },
    data: {
      ...EVALUATION,
      companyId: 'invalid-uuid',
    },
  },
  {
    meta: {
      title: 'workerId is not a valid UUID',
      expected: 'worker "id" must be a valid UUID',
    },
    data: {
      ...EVALUATION,
      workerId: 'invalid-uuid',
    },
  },
  {
    meta: {
      title: 'categories is not an array',
      expected: 'categories must be an array',
    },
    data: {
      ...EVALUATION,
      categories: 'invalid-array',
    },
  },
  {
    meta: {
      title: 'categories is not an array of Category',
      expected: 'must be of type object',
    },
    data: {
      ...EVALUATION,
      categories: ['invalid-category'],
    },
  },
  {
    meta: {
      title: 'comment is not a string',
      expected: 'comment must be a string',
    },
    data: {
      ...EVALUATION,
      comment: 123,
    },
  },
  {
    meta: {
      title: 'createdAt is not a Date',
      expected: 'createdAt must be a valid date',
    },
    data: {
      ...EVALUATION,
      createdAt: '2021X09X01',
    },
  },
  {
    meta: {
      title: 'updatedAt is not a Date',
      expected: 'updatedAt must be a valid date',
    },
    data: {
      ...EVALUATION,
      updatedAt: '2021X09X01',
    },
  },
] as ITestInput<IEvaluationProps>[];

const INVALID_EVALUATION_COMMENTS: ITestInput<IEvaluationProps>[] = [
  {
    meta: {
      title: 'comment is empty',
      expected: 'comment is not allowed to be empty',
    },
    data: {
      ...EVALUATION,
      comment: '',
    },
  },
  {
    meta: {
      title: 'comment is too short',
      expected: 'comment must be at least 3 characters',
    },
    data: {
      ...EVALUATION,
      comment: 'ab',
    },
  },
  {
    meta: {
      title: 'comment is too long',
      expected: 'comment must be at most 255 characters',
    },
    data: {
      ...EVALUATION,
      comment: 'a'.repeat(256),
    },
  },
];

const INVALID_EVALUATION_CATEGORIES: ITestInput<IEvaluationProps>[] = [
  {
    meta: {
      title: 'categories is empty',
      expected: 'categories must be completed',
    },
    data: {
      ...EVALUATION,
      categories: [],
    },
  },
  {
    meta: {
      title: 'categories has duplicated names',
      expected: 'categories must be completed',
    },
    data: {
      ...EVALUATION,
      categories: [
        EVALUATION.categories[0],
        EVALUATION.categories[0],
        EVALUATION.categories[0],
        EVALUATION.categories[0],
      ],
    },
  },
  {
    meta: {
      title: 'categories has invalid names',
      expected: 'must be one of [diversidade, inclusão, equidade, benefícios]',
    },
    data: {
      ...EVALUATION,
      categories: [
        EVALUATION.categories[0],
        EVALUATION.categories[1],
        { ...EVALUATION.categories[2], name: 'invalid-category' as any },
        { ...EVALUATION.categories[3], name: 'invalid-category' as any },
      ],
    },
  },
  {
    meta: {
      title: 'categories are not completed',
      expected: 'categories must be completed',
    },
    data: {
      ...EVALUATION,
      categories: [EVALUATION.categories[0], EVALUATION.categories[1]],
    },
  },
];

describe('[Domain][Unit] Tests for EvaluationJoiValidator', () => {
  it.each(INVALID_EVALUATION_INPUTS)(
    'should throw an error when $meta.title',
    ({ data, meta }) => {
      const validator = new EvaluationJoiValidator();

      const act = () => validator.validate(data);

      try {
        act();
        fail('should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(EvaluationValidationException);
        expect(error.message).toContain(meta.expected);
        expect(error.toHttp()).toBe(400);
      }
    },
  );

  it.each(INVALID_EVALUATION_COMMENTS)(
    'should throw an error when $meta.title',
    ({ data, meta }) => {
      const validator = new EvaluationJoiValidator();

      const act = () => validator.validate(data);

      try {
        act();
        fail('should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(EvaluationValidationException);
        expect(error.message).toContain(meta.expected);
        expect(error.toHttp()).toBe(400);
      }
    },
  );

  it.each(INVALID_EVALUATION_CATEGORIES)(
    'should throw an error when $meta.title',
    ({ data, meta }) => {
      const validator = new EvaluationJoiValidator();

      const act = () => validator.validate(data);

      try {
        act();
        fail('should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(EvaluationValidationException);
        expect(error.message).toContain(meta.expected);
        expect(error.toHttp()).toBe(400);
      }
    },
  );
});
