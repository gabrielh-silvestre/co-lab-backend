import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

import type { RegisterWorkerBody } from '@worker/infra/controller/Woker.controller.dto';

import { PipeValidationException } from '@worker/infra/exception/PipeValidation.exception';

@Injectable()
export class JoiValidationPipe implements PipeTransform<RegisterWorkerBody> {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);

    if (error) throw new PipeValidationException(error.message, error);
    return value;
  }
}
