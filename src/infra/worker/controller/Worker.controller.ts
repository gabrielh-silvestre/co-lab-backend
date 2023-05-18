import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

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
import { AuthGuard } from '@shared/infra/guard/Auth.guard';

import { User } from '@utils/decorators/user/User.decorator';

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

  @Put('update')
  @UseGuards(AuthGuard)
  async update(
    @User('id') id: string,
    @Body(new UpdateWorkerPipe()) body: UpdateWorkerBody,
  ): Promise<OutputUpdateWorkerDto> {
    return this.updateUseCase.execute({ id, ...body });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async findById(@User('id') id: string): Promise<OutputFindWorkerByIdDto> {
    return this.findByIdUseCase.execute({ id });
  }
}
