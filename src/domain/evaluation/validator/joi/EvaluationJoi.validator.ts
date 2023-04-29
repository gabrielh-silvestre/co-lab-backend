import * as Joi from 'joi';

import type { IEvaluationProps } from '../../entity/Evaluation.interface';
import type { IEvaluationValidator } from '../Evaluation.validator.interface';

import { EvaluationValidationException } from '@evaluation/domain/exception/Validation.exception';

export class EvaluationJoiValidator implements IEvaluationValidator {
  private readonly schema: Joi.Schema;

  constructor() {
    this.schema = Joi.object<IEvaluationProps>({
      id: Joi.string()
        .uuid({ version: ['uuidv4'], separator: '-' })
        .required()
        .messages({
          'string.guid': 'id must be a valid UUID',
        }),
      workerId: Joi.string()
        .uuid({ version: ['uuidv4'], separator: '-' })
        .required()
        .messages({
          'string.guid': 'worker "id" must be a valid UUID',
        }),
      companyId: Joi.string()
        .uuid({ version: ['uuidv4'], separator: '-' })
        .required()
        .messages({
          'string.guid': 'company "id" must be a valid UUID',
        }),
      categories: Joi.array()
        .unique((a, b) => a.name === b.name)
        .items(
          Joi.object({
            id: Joi.string()
              .uuid({ version: ['uuidv4'], separator: '-' })
              .required()
              .messages({
                'string.guid': 'id must be a valid UUID',
              }),
            name: Joi.string()
              .valid('diversidade', 'inclusão', 'equidade', 'liderança')
              .required(),
            rating: Joi.number().greater(0).max(5).required().messages({
              'number.base': 'rating must be a number',
              'number.min': 'rating must be at least 0',
              'number.max': 'rating must be at most 5',
              'number.empty': 'rating cannot be empty',
            }),
          }),
        )
        .length(4)
        .required()
        .messages({
          'array.base': 'categories must be an array',
          'array.unique': 'categories must be completed',
          'array.length': 'categories must be completed',
        }),
      comment: Joi.string()
        .allow(null)
        .trim()
        .empty()
        .min(3)
        .max(255)
        .messages({
          'string.base': 'comment must be a string',
          'string.min': 'comment must be at least 3 characters',
          'string.max': 'comment must be at most 255 characters',
          'string.empty': 'comment is not allowed to be empty',
        }),
      createdAt: Joi.date().required().messages({
        'date.base': 'createdAt must be a valid date',
      }),
      updatedAt: Joi.date().required().messages({
        'date.base': 'updatedAt must be a valid date',
      }),
    });
  }

  validate(value: IEvaluationProps): void {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new EvaluationValidationException(error.message);
    }
  }
}
