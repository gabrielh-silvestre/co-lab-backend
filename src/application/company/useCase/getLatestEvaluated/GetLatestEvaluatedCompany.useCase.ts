import { Inject, Injectable } from '@nestjs/common';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  InputGetLatestEvaluatedCompaniesDto,
  OutputGetLatestEvaluatedCompaniesDto,
} from './GetLatestEvaluatedCompanies.dto';

import { COMPANY_REPOSITORY } from '@utils/constants';

@Injectable()
export class GetLatestEvaluatedCompaniesUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly repo: ICompanyRepository,
  ) {}

  async execute({
    size = 5,
  }: InputGetLatestEvaluatedCompaniesDto): Promise<
    OutputGetLatestEvaluatedCompaniesDto[]
  > {
    const companies = await this.repo.getLatestEvaluated(size);

    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      image: company.image,
      rating: company.getRating(),
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }));
  }
}
