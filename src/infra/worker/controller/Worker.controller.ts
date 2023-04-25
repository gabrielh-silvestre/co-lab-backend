import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import * as Joi from 'joi';

import type { OutputRegisterWorkerDto } from '@worker/app/useCase/register/RegisterWorker.dto';
import type { RegisterWorkerBody } from './Woker.controller.dto';

import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { JoiValidationPipe } from '../pipe/validation/JoiValidation.pipe';

const registerWorkerSchema = Joi.object<RegisterWorkerBody>({
  id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

@Controller('workers')
export class WorkerController {
  constructor(private readonly registerUseCase: RegisterWorkerUseCase) {}

  @Post('register')
  @UsePipes(new JoiValidationPipe(registerWorkerSchema))
  async register(
    @Body() body: RegisterWorkerBody,
  ): Promise<OutputRegisterWorkerDto> {
    return this.registerUseCase.execute(body);
  }
}
