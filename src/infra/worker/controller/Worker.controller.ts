import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import type { OutputRegisterWorkerDto } from '@worker/app/useCase/register/RegisterWorker.dto';
import type {
  RegisterWorkerBody,
  UpdateWorkerBody,
} from './Woker.controller.dto';
import type { OutputUpdateWorkerDto } from '@worker/app/useCase/update/UpdateWorker.dto';

import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { UpdateWorkerUseCase } from '@worker/app/useCase/update/UpdateWorker.useCase';

import { RegisterWorkerPipe } from '../pipe/RegisterWorker.pipe';
import { UpdateWorkerPipe } from '../pipe/UpdateWorker.pipe';

@Controller('workers')
export class WorkerController {
  constructor(
    private readonly registerUseCase: RegisterWorkerUseCase,
    private readonly updateUseCase: UpdateWorkerUseCase,
  ) {}

  @Post('register')
  async register(
    @Body(new RegisterWorkerPipe()) body: RegisterWorkerBody,
  ): Promise<OutputRegisterWorkerDto> {
    return this.registerUseCase.execute(body);
  }

  @Put('update/:id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new UpdateWorkerPipe()) body: UpdateWorkerBody,
  ): Promise<OutputUpdateWorkerDto> {
    return this.updateUseCase.execute({ id, ...body });
  }
}
