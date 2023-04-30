import { Inject, Injectable } from '@nestjs/common';

import type { ICompany } from '@company/domain/entity/Company.interface';
import type { IEvaluation } from '@evaluation/domain/entity/Evaluation.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  FindCompanyByIdCategoryDto,
  FindCompanyByIdEvaluationDto,
  InputFindCompanyByIdDto,
  OutputFindCompanyByIdDto,
} from './FindCompanyById.dto';

import { CompanyNotFoundException } from '@company/app/exception/CompanyNotFound.exception';

import { COMPANY_REPOSITORY } from '@utils/constants';

@Injectable()
export class FindCompanyByIdUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly repo: ICompanyRepository,
  ) {}

  private evaluationToDto(
    evaluation: IEvaluation,
  ): FindCompanyByIdEvaluationDto {
    const categories: FindCompanyByIdCategoryDto[] = evaluation.categories.map(
      (category) => ({
        name: category.name,
        rating: category.rating,
      }),
    );

    return {
      ...evaluation.toObject(),
      rating: evaluation.getRating(),
      categories,
    };
  }

  private companyToDto(company: ICompany): OutputFindCompanyByIdDto {
    const evaluations: FindCompanyByIdEvaluationDto[] = company.evaluations.map(
      (evaluation) => this.evaluationToDto(evaluation),
    );

    return {
      ...company.toObject(),
      rating: company.getRating(),
      evaluations,
    };
  }

  async execute({
    id,
  }: InputFindCompanyByIdDto): Promise<OutputFindCompanyByIdDto> {
    const foundCompany = await this.repo.findById(id);
    if (foundCompany === null) throw new CompanyNotFoundException();

    return this.companyToDto(foundCompany);
  }
}
