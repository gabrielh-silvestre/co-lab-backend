import { fail } from 'assert';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  FindCompanyByIdCategoryDto,
  FindCompanyByIdEvaluationDto,
  OutputFindCompanyByIdDto,
} from '@company/app/useCase/findById/FindCompanyById.dto';

import { CompanyFactory } from '@company/domain/factory/Company.factory';
import { EvaluationFactory } from '@evaluation/domain/factory/Evaluation.factory';
import { FindCompanyByIdUseCase } from '@company/app/useCase/findById/FindCompanyById.useCase';

import { CompanyNotFoundException } from '@company/app/exception/CompanyNotFound.exception';

import { TIMESTPAMP_PATTERN, mockCompanyRepository } from '@utils/mocks';

describe('[Application][Unit] Tests for FindCompanyByIdUseCase', () => {
  let useCase: FindCompanyByIdUseCase;

  let repo: ICompanyRepository;

  beforeEach(() => {
    repo = mockCompanyRepository;

    useCase = new FindCompanyByIdUseCase(repo);
  });

  it('should create a FindCompanyByIdUseCase', () => {
    expect(useCase).toBeInstanceOf(FindCompanyByIdUseCase);
  });

  it('should find a company by id', async () => {
    const company = CompanyFactory.createMany(1, [])[0];
    jest.mocked(repo.findById).mockResolvedValue(company);

    const foundCompany = await useCase.execute({ id: company.id });

    expect(repo.findById).toHaveBeenCalledTimes(1);

    expect(foundCompany).not.toBeNull();
    expect(foundCompany.id).toBe(company.id);
  });

  it('should return a company with evaluations', async () => {
    const evaluations = EvaluationFactory.createMany(3);
    const company = CompanyFactory.createMany(1, evaluations)[0];
    jest.mocked(repo.findById).mockResolvedValue(company);

    const foundCompany = await useCase.execute({ id: company.id });

    expect(foundCompany).toStrictEqual<OutputFindCompanyByIdDto>({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
      rating: expect.any(Number),
      evaluations: expect.any(Array),
      createdAt: expect.stringMatching(TIMESTPAMP_PATTERN),
      updatedAt: expect.stringMatching(TIMESTPAMP_PATTERN),
    });
    expect(
      foundCompany.evaluations[0],
    ).toMatchObject<FindCompanyByIdEvaluationDto>({
      id: expect.any(String),
      comment: expect.any(String),
      categories: expect.any(Array),
      rating: expect.any(Number),
      createdAt: expect.stringMatching(TIMESTPAMP_PATTERN),
      updatedAt: expect.stringMatching(TIMESTPAMP_PATTERN),
    });
    expect(
      foundCompany.evaluations[0].categories[0],
    ).toMatchObject<FindCompanyByIdCategoryDto>({
      name: expect.any(String),
      rating: expect.any(Number),
    });
  });

  it('should throw an error when company not found', async () => {
    jest.mocked(repo.findById).mockResolvedValue(null);

    const act = async () => await useCase.execute({ id: '1' });

    try {
      await act();
      fail('should throw an error when company not found');
    } catch (error) {
      expect(error).toBeInstanceOf(CompanyNotFoundException);
      expect(error.message).toContain('Company not found');
      expect(error.toHttp()).toBe(404);
    }
  });
});
