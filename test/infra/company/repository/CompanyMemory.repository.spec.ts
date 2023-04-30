import { CompanyFactory } from '@company/domain/factory/Company.factory';

import type { ITestInput } from '@utils/types';
import type { ICompany } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';

import { CompanyMemoryRepository } from '@company/infra/repository/memory/CompanyMemory.repository';

const COMPANIES: ICompany[] = CompanyFactory.createMany(10, []);

type CompanySearchInput = { method: string; value: string };

const COMPANY_SEARCHS: ITestInput<CompanySearchInput>[] = [
  {
    meta: {
      title: 'should be able to find a company by id',
      expected: COMPANIES[0],
    },
    data: { method: 'findById', value: COMPANIES[0].id },
  },
  {
    meta: {
      title: 'should be able to search companies by name',
      expected: COMPANIES, // all companies have the same name
    },
    data: { method: 'searchByName', value: COMPANIES[0].name },
  },
  {
    meta: {
      title: 'should return null if not found a company by id',
      expected: null,
    },
    data: { method: 'findById', value: 'invalid-uuid' },
  },
  {
    meta: {
      title: 'should return empty array if not found a company by name',
      expected: [],
    },
    data: { method: 'searchByName', value: 'invalid-name' },
  },
];

describe('[Infra][Unit] Tests for CompanyMemoryRepository', () => {
  let repository: ICompanyRepository;

  beforeEach(() => {
    repository = new CompanyMemoryRepository().populate(COMPANIES);
  });

  it.each(COMPANY_SEARCHS)(
    '$meta.title',
    async ({ data: { method, value }, meta: { expected } }) => {
      const result = await repository[method](value);
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