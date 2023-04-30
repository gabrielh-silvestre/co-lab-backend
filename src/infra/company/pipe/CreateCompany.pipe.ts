import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import type { CreateCompanyBody } from '../controller/Company.controller.dto';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';

@Injectable()
export class CreateCompanyValidationPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<CreateCompanyBody>({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        image: Joi.string().optional(),
      }),
    );
  }
}
