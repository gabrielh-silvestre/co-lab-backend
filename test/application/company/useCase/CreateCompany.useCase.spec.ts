import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';

import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type {
  InputCreateCompanyDto,
  OutputCreateCompanyDto,
} from '@company/app/useCase/create/CreateCompany.dto';

import {
  TIMESTPAMP_PATTERN,
  mockCompanyRepository,
  mockCompanyEventEmitter,
} from '@utils/mocks';

describe('[Application][Unit] Tests for CreateCompanyUseCase', () => {
  let useCase: CreateCompanyUseCase;

  let emitter: IEventEmitter;

  let repo: ICompanyRepository;

  beforeEach(() => {
    repo = mockCompanyRepository;
    emitter = mockCompanyEventEmitter;

    useCase = new CreateCompanyUseCase(repo, emitter);
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
    expect(emitter.emit).toHaveBeenCalledTimes(1);

    const eventName = jest.mocked(emitter.emit).mock.calls[0][0].name;
    expect(eventName).toBe('CompanyCreated');
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
