import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';

import { SearchCompanyByNameUseCase } from '@company/app/useCase/searchByName/SearchCompanyByName.useCase';

import { mockCompanyRepository } from '@utils/mocks';
import { CompanyFactory } from '@company/domain/factory/Company.factory';

describe('[Application][Unit] Tests for SearchCompanyByNameUseCase', () => {
  let useCase: SearchCompanyByNameUseCase;

  let repo: ICompanyRepository;

  beforeEach(() => {
    repo = mockCompanyRepository;

    useCase = new SearchCompanyByNameUseCase(repo);
  });

  it('should create a SearchCompanyByNameUseCase', () => {
    expect(useCase).toBeInstanceOf(SearchCompanyByNameUseCase);
  });

  it('should search a company by name', async () => {
    const company = CompanyFactory.createMany(1, [])[0];
    jest.mocked(repo.searchByName).mockResolvedValue([company]);

    const foundCompany = await useCase.execute({ name: company.name });

    expect(repo.searchByName).toHaveBeenCalledTimes(1);

    expect(foundCompany.length).not.toBe(0);
    expect(foundCompany[0].id).toBe(company.id);
  });

  it('should return a list of found companies', async () => {
    const companies = CompanyFactory.createMany(3, []);
    jest.mocked(repo.searchByName).mockResolvedValue(companies);

    const foundCompanies = await useCase.execute({ name: companies[0].name });

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
