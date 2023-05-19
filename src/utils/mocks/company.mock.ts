import type { ICompanyProps } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import {
  CompanyFactory,
  CreateCompanyProps,
} from '@company/domain/factory/Company.factory';
import { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';

export const COMPANY_INPUT: CreateCompanyProps = {
  name: 'Company',
  description: 'Company description',
  image: 'Company image',
};

export const COMPANY: ICompanyProps = CompanyFactory.createMany(
  1,
  [],
)[0].toObject();

export const mockCompanyRepository: ICompanyRepository = {
  create: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
  findById: jest.fn().mockResolvedValue(undefined),
  search: jest.fn().mockResolvedValue(undefined),
  getLatestEvaluated: jest.fn().mockResolvedValue(undefined),
};

export const mockCompanyEventEmitter: IEventEmitter = {
  emit: jest.fn().mockResolvedValue(undefined),
  register: jest.fn().mockResolvedValue(undefined),
  unregister: jest.fn().mockResolvedValue(undefined),
  unregisterAll: jest.fn().mockResolvedValue(undefined),
};
