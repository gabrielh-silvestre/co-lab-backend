import { Inject, Injectable } from '@nestjs/common';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  InputSearchCompanyDto,
  OutputSearchCompanyDto,
} from './SearchCompany.dto';

import { COMPANY_REPOSITORY } from '@utils/constants';

@Injectable()
export class SearchCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly repo: ICompanyRepository,
  ) {}

  async execute({
    query,
    pagination,
  }: InputSearchCompanyDto): Promise<OutputSearchCompanyDto[]> {
    const foundCompanies = await this.repo.search({
      search: query?.search,
      limit: pagination?.limit,
      offset: pagination?.offset,
    });
    const companiesObj = foundCompanies.map((company) => ({
      ...company.toObject(),
      rating: company.getRating(),
    }));

    return companiesObj.map(
      ({ id, name, image, rating, createdAt, updatedAt }) => ({
        id,
        name,
        image,
        rating,
        createdAt,
        updatedAt,
      }),
    );
  }
}
