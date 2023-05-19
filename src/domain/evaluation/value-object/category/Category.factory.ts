import { randomUUID } from 'node:crypto';

import type { CategoryName, ICategoryProps } from './Category.interface';

import { Category } from './Category.value-object';

export type CreateCategoryProps = {
  name: CategoryName;
  rating: number;
};

export class CategoryFactory {
  static create({ name, rating }: CreateCategoryProps): Category {
    return new Category(randomUUID(), name, rating);
  }

  static createFromPersistence({ id, name, rating }: ICategoryProps): Category {
    return new Category(id, name, rating);
  }

  static createMany(n: number): Category[][] {
    const categoryNames: CategoryName[] = [
      'diversidade',
      'crescimento',
      'equidade',
      'benefícios',
    ];

    return Array.from({ length: n }, () => {
      const categories = [];

      for (const i in categoryNames) {
        const rating = Math.floor(Math.random() * 5) + 1;
        categories.push(
          CategoryFactory.create({
            name: categoryNames[i],
            rating,
          }),
        );
      }

      return categories;
    });
  }
}
