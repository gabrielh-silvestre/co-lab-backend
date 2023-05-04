import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';

import { SearchCompanyUseCase } from '@company/app/useCase/search/SearchCompany.useCase';

import { mockCompanyRepository } from '@utils/mocks';
import { CompanyFactory } from '@company/domain/factory/Company.factory';

describe('[Application][Unit] Tests for SearchCompanyUseCase', () => {
  let useCase: SearchCompanyUseCase;

  let repo: ICompanyRepository;

  beforeEach(() => {
    repo = mockCompanyRepository;

    useCase = new SearchCompanyUseCase(repo);
  });

  it('should create a SearchCompanyUseCase', () => {
    expect(useCase).toBeInstanceOf(SearchCompanyUseCase);
  });

  it('should search a company by name', async () => {
    const company = CompanyFactory.createMany(1, [])[0];
    jest.mocked(repo.search).mockResolvedValue([company]);

    const foundCompany = await useCase.execute({
      query: { search: { field: 'name', value: company.name } },
    });

    expect(repo.search).toHaveBeenCalledTimes(1);

    expect(foundCompany.length).not.toBe(0);
    expect(foundCompany[0].id).toBe(company.id);
  });

  it('should return a list of found companies', async () => {
    const companies = CompanyFactory.createMany(3, []);
    jest.mocked(repo.search).mockResolvedValue(companies);

    const foundCompanies = await useCase.execute({
      query: { search: { field: 'name', value: companies[0].name } },
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
