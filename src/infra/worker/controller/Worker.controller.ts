import { Body, Controller, Post } from '@nestjs/common';

import type { OutputRegisterWorkerDto } from '@worker/app/useCase/register/RegisterWorker.dto';
import type { RegisterWorkerBody } from './Woker.controller.dto';

import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';

import { RegisterWorkerPipe } from '../pipe/RegisterWorker.pipe';

@Controller('workers')
export class WorkerController {
  constructor(private readonly registerUseCase: RegisterWorkerUseCase) {}

  @Post('register')
  async register(
    @Body(new RegisterWorkerPipe()) body: RegisterWorkerBody,
  ): Promise<OutputRegisterWorkerDto> {
    return this.registerUseCase.execute(body);
  }
}
