import { Inject } from '@nestjs/common';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type { InputAddEvaluationDto } from './AddEvaluation.dto';

import { CompanyNotFoundException } from '@company/app/exception/CompanyNotFound.exception';

import { COMPANY_REPOSITORY } from '@utils/constants';

export class AddEvaluationUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly repo: ICompanyRepository,
  ) {}

  private async findCompany(companyId: string) {
    const company = await this.repo.findById(companyId);
    if (!company) throw new CompanyNotFoundException();

    return company;
  }

  async execute(dto: InputAddEvaluationDto): Promise<void> {
    const { companyId } = dto;

    const company = await this.findCompany(companyId);

    company.addEvaluation(dto);

    await this.repo.update(company);
  }
}
