import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import type { OutputCreateCompanyDto } from '@company/app/useCase/create/CreateCompany.dto';
import type { OutputFindCompanyByIdDto } from '@company/app/useCase/findById/FindCompanyById.dto';
import type { OutputSearchCompanyByNameDto } from '@company/app/useCase/searchByName/SearchCompanyByName.dto';
import type {
  AddEvaluationBody,
  CreateCompanyBody,
} from './Company.controller.dto';

import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';
import { AddEvaluationUseCase } from '@company/app/useCase/addEvaluation/AddEvaluation.useCase';
import { FindCompanyByIdUseCase } from '@company/app/useCase/findById/FindCompanyById.useCase';
import { SearchCompanyByNameUseCase } from '@company/app/useCase/searchByName/SearchCompanyByName.useCase';

import { CreateCompanyValidationPipe } from '../pipe/CreateCompany.pipe';
import { AddEvaluationValidationPipe } from '../pipe/AddEvaluation.pipe';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createUseCase: CreateCompanyUseCase,
    private readonly addEvaluationUseCase: AddEvaluationUseCase,
    private readonly findByIdUseCase: FindCompanyByIdUseCase,
    private readonly searchByNameUseCase: SearchCompanyByNameUseCase,
  ) {}

  @Post('create')
  async create(
    @Body(new CreateCompanyValidationPipe()) body: CreateCompanyBody,
  ): Promise<OutputCreateCompanyDto> {
    return this.createUseCase.execute(body);
  }

  @Get('search')
  async searchByName(
    @Query('name') name: string,
  ): Promise<OutputSearchCompanyByNameDto[]> {
    return this.searchByNameUseCase.execute({ name });
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OutputFindCompanyByIdDto> {
    return this.findByIdUseCase.execute({ id });
  }

  @Patch(':id/add-evaluation')
  async addEvaluation(
    @Body(new AddEvaluationValidationPipe()) body: AddEvaluationBody,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.addEvaluationUseCase.execute({
      ...body,
      companyId: id,
    });
  }
}
