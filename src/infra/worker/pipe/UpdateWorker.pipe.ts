import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import type { UpdateWorkerBody } from '../controller/Woker.controller.dto';

import { PipeValidationException } from '@shared/infra/exception/PipeValidation.exception';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';

@Injectable()
export class UpdateWorkerPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<UpdateWorkerBody>({
        name: Joi.string().optional(),
        age: Joi.number().optional(),
        salary: Joi.number().optional(),
      }),
    );
  }

  transform(value: any) {
    const isAllEmpty = Object.values(value).every((v) => !v);
    if (isAllEmpty) throw new PipeValidationException('No data to update');

    return super.transform(value);
  }
}
