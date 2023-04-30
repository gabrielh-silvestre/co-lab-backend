import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import type { AddEvaluationBody } from '../controller/Company.controller.dto';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';

@Injectable()
export class AddEvaluationValidationPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<AddEvaluationBody>({
        workerId: Joi.string()
          .uuid({ version: 'uuidv4', separator: '-' })
          .required(),
        comment: Joi.string().optional(),
        categories: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              rating: Joi.number().min(0).max(5).required(),
            }),
          )
          .required(),
      }),
    );
  }
}
