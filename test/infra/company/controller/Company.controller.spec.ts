import { randomUUID } from 'node:crypto';
import { Test } from '@nestjs/testing';

import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type { OutputFindCompanyByIdDto } from '@company/app/useCase/findById/FindCompanyById.dto';
import type { OutputCreateCompanyDto } from '@company/app/useCase/create/CreateCompany.dto';
import type { OutputSearchCompanyByNameDto } from '@company/app/useCase/searchByName/SearchCompanyByName.dto';
import type {
  AddEvaluationBody,
  CreateCompanyBody,
} from '@company/infra/controller/Company.controller.dto';

import { CompanyFactory } from '@company/domain/factory/Company.factory';
import { EvaluationFactory } from '@evaluation/domain/factory/Evaluation.factory';
import { CategoryFactory } from '@evaluation/domain/value-object/category/Category.factory';

import { CompanyMemoryRepository } from '@company/infra/repository/memory/CompanyMemory.repository';
import { AddEvaluationUseCase } from '@company/app/useCase/addEvaluation/AddEvaluation.useCase';
import { CreateCompanyUseCase } from '@company/app/useCase/create/CreateCompany.useCase';
import { FindCompanyByIdUseCase } from '@company/app/useCase/findById/FindCompanyById.useCase';
import { SearchCompanyByNameUseCase } from '@company/app/useCase/searchByName/SearchCompanyByName.useCase';

import { CompanyController } from '@company/infra/controller/Company.controller';

import { COMPANY_EVENT_EMITTER, COMPANY_REPOSITORY } from '@utils/constants';
import { TIMESTPAMP_PATTERN } from '@utils/mocks';

const EVALUATIONS = EvaluationFactory.createMany(5);
const COMPANIES = CompanyFactory.createMany(10, EVALUATIONS);

describe('[Infra][Integration] Tests for CompanyController', () => {
  let controller: CompanyController;

  let repo: ICompanyRepository;

  beforeEach(async () => {
    repo = new CompanyMemoryRepository().populate(COMPANIES);

    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CreateCompanyUseCase,
        AddEvaluationUseCase,
        FindCompanyByIdUseCase,
        SearchCompanyByNameUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useValue: repo,
        },
        {
          provide: COMPANY_EVENT_EMITTER,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            emit: () => {},
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(CompanyController);
  });

  it('should create a CompanyController', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(CompanyController);
  });

  it('should create a company', async () => {
    const dto: CreateCompanyBody = {
      name: 'name',
      description: 'description',
      image: 'image',
    };

    const response = await controller.create(dto);

    expect(response).toBeDefined();
    expect(response).toStrictEqual<OutputCreateCompanyDto>({
      id: expect.any(String),
      name: dto.name,
      description: dto.description,
      image: dto.image,
      createdAt: expect.stringMatching(TIMESTPAMP_PATTERN),
      updatedAt: expect.stringMatching(TIMESTPAMP_PATTERN),
    });

    expect(repo.findById(response.id)).resolves.toBeDefined();
  });

  it('should add an evaluation to a company', async () => {
    const initialLength = COMPANIES[0].evaluations.length;
    const dto: AddEvaluationBody = {
      workerId: randomUUID(),
      categories: CategoryFactory.createMany(1)[0],
      comment: 'comment',
    };

    const response = await controller.addEvaluation(dto, COMPANIES[0].id);
    expect(response).toBeUndefined();

    const foundCompany = await repo.findById(COMPANIES[0].id);
    expect(foundCompany).toBeDefined();
    expect(foundCompany.evaluations).toHaveLength(initialLength + 1);
  });

  it('should find a company by id', async () => {
    const response = await controller.findById(COMPANIES[0].id);

    expect(response).not.toBeNull();
    expect(response).toStrictEqual<OutputFindCompanyByIdDto>({
      id: COMPANIES[0].id,
      name: COMPANIES[0].name,
      image: COMPANIES[0].image,
      description: COMPANIES[0].description,
      rating: COMPANIES[0].getRating(),
      evaluations: expect.any(Array),
      createdAt: expect.stringMatching(TIMESTPAMP_PATTERN),
      updatedAt: expect.stringMatching(TIMESTPAMP_PATTERN),
    });
  });

  it('should search companies by name', async () => {
    const response = await controller.searchByName('company'); // all companies have 'company' in their name

    expect(response).toBeDefined();
    expect(response).toHaveLength(COMPANIES.length);

    response.forEach((company) => {
      expect(company).toStrictEqual<OutputSearchCompanyByNameDto>({
        id: expect.any(String),
        name: expect.stringMatching(/company/g),
        image: expect.any(String),
        rating: expect.any(Number),
        createdAt: expect.stringMatching(TIMESTPAMP_PATTERN),
        updatedAt: expect.stringMatching(TIMESTPAMP_PATTERN),
      });
    });
  });
});
