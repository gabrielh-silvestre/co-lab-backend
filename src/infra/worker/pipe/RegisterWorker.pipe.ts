import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import type { RegisterWorkerBody } from '../controller/Woker.controller.dto';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';

@Injectable()
export class RegisterWorkerPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<RegisterWorkerBody>({
        id: Joi.string().uuid({ version: 'uuidv4', separator: '-' }).required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      }),
    );
  }
}
