import { randomUUID } from 'node:crypto';

import type { ITestInput } from '@utils/types';

import { Category } from '@evaluation/domain/value-object/category/Category.value-object';
import { DomainException } from '@shared/domain/exception/Domain.exception';

const UUID = randomUUID();

const INVALID_CATEGORY_NAME: ITestInput<string>[] = [
  {
    meta: {
      title: 'with empty name',
      expected: 'Category name must be one of the following',
    },
    data: '',
  },
  {
    meta: {
      title: 'with invalid name',
      expected: 'Category name must be one of the following',
    },
    data: 'invalid',
  },
];

const INVALID_CATEGORY_RATING: ITestInput<number>[] = [
  {
    meta: {
      title: 'with rating less than 1',
      expected: 'Rating must be between 1 and 5',
    },
    data: 0,
  },
  {
    meta: {
      title: 'with rating greater than 5',
      expected: 'Rating must be between 1 and 5',
    },
    data: 6,
  },
];

describe('[Domain][Unit] Tests for Category value-object', () => {
  it('should create a Category', () => {
    const category = new Category(UUID, 'diversidade', 5);

    expect(typeof category.id).toBe('string');
    expect(category.name).toBe('diversidade');
    expect(category.rating).toBe(5);
  });

  it.each(INVALID_CATEGORY_NAME)(
    'should throw an error when creating a Category $meta.title',
    ({ meta, data }) => {
      try {
        new Category(UUID, data as any, 5);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toContain(meta.expected);
      }
    },
  );

  it.each(INVALID_CATEGORY_RATING)(
    'should throw an error when creating a Category $meta.title',
    () => {
      try {
        new Category(UUID, 'diversidade', 0);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toContain('Rating must be between 1 and 5');
      }
    },
  );
});
