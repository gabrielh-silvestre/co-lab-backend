import * as Joi from 'joi';

import type { IWorkerProps } from '@worker/domain/entity/Worker.interface';
import type { IWorkerValidator } from '../Worker.validator.interface';

import { WorkerDomainException } from '@worker/domain/exception/WorkerDomain.exception';

export class WorkerJoiValidator implements IWorkerValidator {
  private readonly schema: Joi.Schema;

  constructor() {
    this.schema = Joi.object({
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
      age: Joi.number().greater(15).required().messages({
        'number.greater': 'age must be at least 16',
      }),
      salary: Joi.number().positive().required(),
      createdAt: Joi.date().required(),
      updatedAt: Joi.date().required(),
    });
  }

  validate(value: IWorkerProps): void {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new WorkerDomainException(error.message);
    }
  }
}
