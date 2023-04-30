import { randomUUID } from 'node:crypto';

import { Category } from '@evaluation/domain/value-object/category/Category.value-object';
import { CategoryFactory } from '@evaluation/domain/value-object/category/Category.factory';

describe('[Domain][Unit] Tests for CategoryFactory value-object', () => {
  it('should create a new Category', () => {
    const category = CategoryFactory.create({
      name: 'diversidade',
      rating: 5,
    });

    expect(category).toBeInstanceOf(Category);
  });

  it('should create a new Category from repository', () => {
    const category = CategoryFactory.createFromPersistence({
      id: randomUUID(),
      name: 'diversidade',
      rating: 5,
    });

    expect(category).toBeInstanceOf(Category);
  });

  it('should create many Categories', () => {
    const categories = CategoryFactory.createMany(2);
    const categoryNames = categories.map((category) =>
      category.map((c) => c.name),
    );

    expect(categories).toHaveLength(2);

    categories.forEach((category) => expect(category).toHaveLength(4));
    categories.forEach((category) =>
      expect(Array.isArray(category)).toBe(true),
    );

    categories.forEach((category) =>
      category.forEach((c) => expect(c).toBeInstanceOf(Category)),
    );

    categoryNames.forEach((category) =>
      expect(category).toEqual([
        'diversidade',
        'inclusão',
        'equidade',
        'liderança',
      ]),
    );
  });
});
