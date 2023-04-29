import type { ICategoryProps } from '@evaluation/domain/value-object/category/Category.interface';

import {
  CategoryFactory,
  CreateCategoryProps,
} from '@evaluation/domain/value-object/category/Category.factory';

export const CATEGORY_INPUT: CreateCategoryProps = {
  name: 'diversidade',
  rating: 5,
};

export const CATEGORY: ICategoryProps =
  CategoryFactory.createMany(1)[0][0].toObject();
