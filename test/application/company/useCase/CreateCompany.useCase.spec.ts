import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  InputCreateCompanyDto,
  OutputCreateCompanyDto,
} from '@company/app/useCase/create/CreateCompany.dto';

import { TIMESTPAMP_PATTERN, mockCompanyRepository } from '@utils/mocks';

describe('[Application][Unit] Tests for CreateCompanyUseCase', () => {
  let useCase: CreateCompanyUseCase;

  let repo: ICompanyRepository;

  beforeEach(() => {
    repo = mockCompanyRepository;

    useCase = new CreateCompanyUseCase(repo);
  });

  it('should create a CreateCompanyUseCase', () => {
    expect(useCase).toBeInstanceOf(CreateCompanyUseCase);
  });

  it('should create a company', async () => {
    const dto: InputCreateCompanyDto = {
      name: 'Company',
      description: 'Company description',
      image: 'Company image',
    };

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledTimes(1);
  });

  it('should return the created company', async () => {
    const dto = {
      name: 'Company',
      description: 'Company description',
      image: 'Company image',
    };

    const company = await useCase.execute(dto);

    expect(company).toStrictEqual<OutputCreateCompanyDto>({
      id: expect.any(String),
      name: dto.name,
      description: dto.description,
      image: dto.image,
      createdAt: expect.stringMatching(TIMESTPAMP_PATTERN),
      updatedAt: expect.stringMatching(TIMESTPAMP_PATTERN),
    });
  });
});
