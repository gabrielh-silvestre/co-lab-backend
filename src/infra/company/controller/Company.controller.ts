import type { User as UserData } from '@supabase/supabase-js';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import type { OutputCreateCompanyDto } from '@company/app/useCase/create/CreateCompany.dto';
import type { OutputFindCompanyByIdDto } from '@company/app/useCase/findById/FindCompanyById.dto';
import type { OutputSearchCompanyDto } from '@company/app/useCase/search/SearchCompany.dto';
import type {
  AddEvaluationBody,
  CreateCompanyBody,
} from './Company.controller.dto';

import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';
import { AddEvaluationUseCase } from '@company/app/useCase/addEvaluation/AddEvaluation.useCase';
import { FindCompanyByIdUseCase } from '@company/app/useCase/findById/FindCompanyById.useCase';
import { SearchCompanyUseCase } from '@company/app/useCase/search/SearchCompany.useCase';

import { CreateCompanyValidationPipe } from '../pipe/CreateCompany.pipe';
import { AddEvaluationValidationPipe } from '../pipe/AddEvaluation.pipe';

import { AuthGuard } from '@shared/infra/guard/Auth.guard';
import { User } from '@utils/decorators/user/User.decorator';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createUseCase: CreateCompanyUseCase,
    private readonly addEvaluationUseCase: AddEvaluationUseCase,
    private readonly findByIdUseCase: FindCompanyByIdUseCase,
    private readonly searchCompanyUseCase: SearchCompanyUseCase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create(
    @Body(new CreateCompanyValidationPipe()) body: CreateCompanyBody,
  ): Promise<OutputCreateCompanyDto> {
    return this.createUseCase.execute(body);
  }

  @Get('search')
  async search(
    @Query('field') field?: 'name' | 'description',
    @Query('value') value?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<OutputSearchCompanyDto[]> {
    return this.searchCompanyUseCase.execute({
      query: { search: { field, value } },
      pagination: { limit, offset },
    });
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OutputFindCompanyByIdDto> {
    return this.findByIdUseCase.execute({ id });
  }

  @Patch(':id/add-evaluation')
  @UseGuards(AuthGuard)
  async addEvaluation(
    @Body(new AddEvaluationValidationPipe()) body: AddEvaluationBody,
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserData,
  ): Promise<void> {
    return this.addEvaluationUseCase.execute({
      ...body,
      companyId: id,
      workerId: user.id,
    });
  }
}
