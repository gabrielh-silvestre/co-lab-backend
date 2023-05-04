import { CompanyFactory } from '@company/domain/factory/Company.factory';

import type { ITestInput } from '@utils/types';
import type { ICompany } from '@company/domain/entity/Company.interface';
import type {
  CompanyQuery,
  ICompanyRepository,
} from '@company/domain/repository/Company.repository.interface';

import { CompanyMemoryRepository } from '@company/infra/repository/memory/CompanyMemory.repository';

const COMPANIES: ICompany[] = CompanyFactory.createMany(10, []);

type CompanySearchInput = { method: string; value: string };

const COMPANY_FIND_BY_ID: ITestInput<CompanySearchInput>[] = [
  {
    meta: {
      title: 'should be able to find a company by id',
      expected: COMPANIES[0],
    },
    data: { method: 'findById', value: COMPANIES[0].id },
  },
  {
    meta: {
      title: 'should return null if not found a company by id',
      expected: null,
    },
    data: { method: 'findById', value: 'invalid-uuid' },
  },
];

const COMPANY_SEARCHS: ITestInput<CompanyQuery>[] = [
  {
    meta: {
      title: 'should be able to search companies by name',
      expected: [COMPANIES[0]],
    },
    data: { search: { field: 'name', value: COMPANIES[0].name } },
  },
  {
    meta: {
      title: 'should be able to search companies by description',
      expected: [COMPANIES[0]],
    },
    data: { search: { field: 'description', value: COMPANIES[0].description } },
  },
  {
    meta: {
      title: 'should return be able to set a limit of companies',
      expected: [...COMPANIES].slice(0, 1),
    },
    data: { limit: 1 },
  },
  {
    meta: {
      title: 'should be able to set a limit and offset of companies',
      expected: [COMPANIES[1]],
    },
    data: { limit: 1, offset: 1 },
  },
  {
    meta: {
      title: 'should return all companies if not pass a query',
      expected: COMPANIES,
    },
    data: null,
  },
];

describe('[Infra][Unit] Tests for CompanyMemoryRepository', () => {
  let repository: ICompanyRepository;

  beforeEach(() => {
    repository = new CompanyMemoryRepository().populate(COMPANIES);
  });

  it.each(COMPANY_FIND_BY_ID)(
    '$meta.title',
    async ({ data: { method, value }, meta: { expected } }) => {
      const result = await repository[method](value);
      expect(result).toEqual(expected);
    },
  );

  it.each(COMPANY_SEARCHS)(
    '$meta.title',
    async ({ data: query, meta: { expected } }) => {
      const result = await repository.search(query);
      expect(result).toEqual(expected);
    },
  );

  it('should be able to create a company', async () => {
    const company = CompanyFactory.createMany(1, [])[0];

    await repository.create(company);

    expect(repository.findById(company.id)).resolves.toEqual(company);
  });

  it('should be able to update a company', async () => {
    const company = COMPANIES[0];
    const newCompany = CompanyFactory.createFromPersistence({
      ...company.toObject(),
      name: 'new-name',
    });

    await repository.update(newCompany);
    const updatedCompany = await repository.findById(company.id);

    expect(updatedCompany).toEqual(newCompany);
    expect(updatedCompany).not.toEqual(company);
  });

  it('should throw an error when try to update a company that not exists', async () => {
    const company = CompanyFactory.createMany(1, [])[0];

    const act = async () => await repository.update(company);

    try {
      await act();
      fail('should throw an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
