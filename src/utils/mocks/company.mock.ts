import { ICompanyProps } from '@company/domain/entity/Company.interface';
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
