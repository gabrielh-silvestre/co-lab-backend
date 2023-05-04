import type { ITestInput } from '@utils/types';
import type { ICompany } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type { InputSearchCompanyDto } from '@company/app/useCase/search/SearchCompany.dto';

import { CompanyFactory } from '@company/domain/factory/Company.factory';
import { SearchCompanyUseCase } from '@company/app/useCase/search/SearchCompany.useCase';

import { mockCompanyRepository } from '@utils/mocks';

const COMPANIES: ICompany[] = CompanyFactory.createMany(10, []);

const SEARCH_QUERIES: ITestInput<InputSearchCompanyDto>[] = [
  {
    meta: {
      title: 'name',
      expected: { search: { field: 'name', value: expect.any(String) } },
    },
    data: {
      query: { search: { field: 'name', value: COMPANIES[0].name } },
    },
  },
  {
    meta: {
      title: 'description',
      expected: { search: { field: 'description', value: expect.any(String) } },
    },
    data: {
      query: {
        search: { field: 'description', value: COMPANIES[0].description },
      },
    },
  },
];

const PAGINATION: ITestInput<InputSearchCompanyDto>[] = [
  {
    meta: {
      title: '', // "all companies"
      expected: { search: undefined, limit: undefined, offset: undefined },
    },
    data: {},
  },
  {
    meta: {
      title: 'with limit',
      expected: { limit: 5 },
    },
    data: { pagination: { limit: 5 } },
  },
  {
    meta: {
      title: 'with offset',
      expected: { offset: 5 },
    },
    data: { pagination: { offset: 5 } },
  },
  {
    meta: {
      title: 'with limit and offset',
      expected: { limit: 2, offset: 2 },
    },
    data: { pagination: { limit: 2, offset: 2 } },
  },
];

describe('[Application][Unit] Tests for SearchCompanyUseCase', () => {
  let useCase: SearchCompanyUseCase;

  let repo: ICompanyRepository;

  let spySearch: jest.SpyInstance;

  beforeEach(() => {
    repo = mockCompanyRepository;
    spySearch = jest.spyOn(repo, 'search');

    jest.mocked(repo.search).mockResolvedValue(COMPANIES);

    useCase = new SearchCompanyUseCase(repo);
  });

  it('should create a SearchCompanyUseCase', () => {
    expect(useCase).toBeInstanceOf(SearchCompanyUseCase);
  });

  it.each(SEARCH_QUERIES)(
    'should search a company by $meta.title',
    async ({ data, meta }) => {
      await useCase.execute(data);

      expect(spySearch).toHaveBeenCalledWith(meta.expected);
    },
  );

  it.each(PAGINATION)(
    'should return all companies $meta.title',
    async ({ data, meta: { expected } }) => {
      await useCase.execute(data);

      expect(spySearch).toHaveBeenCalledWith(expected);
    },
  );

  it('should return a list of found companies', async () => {
    jest.mocked(repo.search).mockResolvedValue(COMPANIES);

    const foundCompanies = await useCase.execute({
      query: { search: { field: 'name', value: COMPANIES[0].name } },
    });

    expect(foundCompanies[0]).toStrictEqual({
      id: expect.any(String),
      name: expect.any(String),
      image: expect.any(String),
      rating: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
