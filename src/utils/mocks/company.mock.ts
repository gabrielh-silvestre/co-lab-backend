import type { ICompanyProps } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import {
  CompanyFactory,
  CreateCompanyProps,
} from '@company/domain/factory/Company.factory';

export const COMPANY_INPUT: CreateCompanyProps = {
  name: 'Company',
  description: 'Company description',
  image: 'Company image',
};

export const COMPANY: ICompanyProps = CompanyFactory.createMany(
  1,
  [],
)[0].toObject();

export const mocCompanyRepository: ICompanyRepository = {
  create: jest.fn().mockResolvedValue(undefined),
  findById: jest.fn().mockResolvedValue(undefined),
  searchByName: jest.fn().mockResolvedValue(undefined),
};
