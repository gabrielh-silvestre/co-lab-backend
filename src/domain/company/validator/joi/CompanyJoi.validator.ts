import * as Joi from 'joi';

import type { ICompanyProps } from '@company/domain/entity/Company.interface';
import type { ICompanyValidator } from '../Company.validator.interface';

import { CompanyValidationException } from '@company/domain/exception/Validation.exception';

export class CompanyJoiValidator implements ICompanyValidator {
  private readonly schema: Joi.Schema;

  constructor() {
    this.schema = Joi.object<ICompanyProps>({
      id: Joi.string()
        .uuid({ version: ['uuidv4'], separator: '-' })
        .required()
        .messages({
          'string.guid': 'id must be a valid UUID',
        }),
      name: Joi.string().min(4).max(50).required().messages({
        'string.base': 'name must be a string',
        'string.min': 'name must be at least 4 characters long',
        'string.max': 'name must be at most 50 characters long',
        'string.empty': 'name cannot be empty',
      }),
      image: Joi.string().allow(null).messages({
        'string.base': 'image must be a string',
      }),
      description: Joi.string().allow(null).max(255).required().messages({
        'string.base': 'description must be a string',
        'string.max': 'description must be at most 255 characters long',
        'string.empty': 'description cannot be empty',
      }),
      evaluations: Joi.array().required().messages({
        'array.base': 'evaluations must be an array',
      }),
      createdAt: Joi.date().required().messages({
        'date.base': 'createdAt must be a valid date',
      }),
      updatedAt: Joi.date().required().messages({
        'date.base': 'updatedAt must be a valid date',
      }),
    });
  }

  validate(value: ICompanyProps): void {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new CompanyValidationException(error.message);
    }
  }
}
