import { Inject, Injectable } from '@nestjs/common';

import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { ICompany } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  InputCreateCompanyDto,
  OutputCreateCompanyDto,
} from './CreateCompany.dto';

import { CompanyFactory } from '@company/domain/factory/Company.factory';
import { CompanyEventFactory } from '@company/domain/factory/CompanyEvent.factory';

import { COMPANY_EVENT_EMITTER, COMPANY_REPOSITORY } from '@utils/constants';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly repo: ICompanyRepository,
    @Inject(COMPANY_EVENT_EMITTER) private readonly emitter: IEventEmitter,
  ) {}

  private companyToDto(company: ICompany): OutputCreateCompanyDto {
    const companyObj = company.toObject();

    return {
      id: companyObj.id,
      name: companyObj.name,
      image: companyObj.image,
      description: companyObj.description,
      createdAt: companyObj.createdAt,
      updatedAt: companyObj.updatedAt,
    };
  }

  async execute(dto: InputCreateCompanyDto): Promise<OutputCreateCompanyDto> {
    const newCompany = CompanyFactory.create(dto);

    await this.repo.create(newCompany);

    this.emitter.emit(CompanyEventFactory.created(newCompany));

    return this.companyToDto(newCompany);
  }
}
