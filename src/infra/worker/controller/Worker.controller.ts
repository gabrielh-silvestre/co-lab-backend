import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import type { OutputFindWorkerByIdDto } from '@worker/app/useCase/findById/FindWorkerById.dto';
import type { OutputRegisterWorkerDto } from '@worker/app/useCase/register/RegisterWorker.dto';
import type {
  RegisterWorkerBody,
  UpdateWorkerBody,
} from './Woker.controller.dto';
import type { OutputUpdateWorkerDto } from '@worker/app/useCase/update/UpdateWorker.dto';

import { RegisterWorkerUseCase } from '@worker/app/useCase/register/RegisterWorker.useCase';
import { UpdateWorkerUseCase } from '@worker/app/useCase/update/UpdateWorker.useCase';
import { FindWorkerByIdUseCase } from '@worker/app/useCase/findById/FindWorkerById.useCase';

import { RegisterWorkerPipe } from '../pipe/RegisterWorker.pipe';
import { UpdateWorkerPipe } from '../pipe/UpdateWorker.pipe';

@Controller('workers')
export class WorkerController {
  constructor(
    private readonly registerUseCase: RegisterWorkerUseCase,
    private readonly updateUseCase: UpdateWorkerUseCase,
    private readonly findByIdUseCase: FindWorkerByIdUseCase,
  ) {}

  @Post('register')
  async register(
    @Body(new RegisterWorkerPipe()) body: RegisterWorkerBody,
  ): Promise<OutputRegisterWorkerDto> {
    return this.registerUseCase.execute(body);
  }

  @Put(':id/update')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new UpdateWorkerPipe()) body: UpdateWorkerBody,
  ): Promise<OutputUpdateWorkerDto> {
    return this.updateUseCase.execute({ id, ...body });
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<OutputFindWorkerByIdDto> {
    return this.findByIdUseCase.execute({ id });
  }
}
