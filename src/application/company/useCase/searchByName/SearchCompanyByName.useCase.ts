import { Inject } from '@nestjs/common';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  InputSearchCompanyByNameDto,
  OutputSearchCompanyByNameDto,
} from './SearchCompanyByName.dto';

import { COMPANY_REPOSITORY } from '@utils/constants';

export class SearchCompanyByNameUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly repo: ICompanyRepository,
  ) {}

  async execute({
    name,
  }: InputSearchCompanyByNameDto): Promise<OutputSearchCompanyByNameDto[]> {
    const foundCompanies = await this.repo.searchByName(name);
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
