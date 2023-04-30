import { randomUUID } from 'node:crypto';
import { fail } from 'node:assert';

import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';
import type { InputAddEvaluationDto } from '@company/app/useCase/addEvaluation/AddEvaluation.dto';

import { CompanyFactory } from '@company/domain/factory/Company.factory';
import { CategoryFactory } from '@evaluation/domain/value-object/category/Category.factory';

import { AddEvaluationUseCase } from '@company/app/useCase/addEvaluation/AddEvaluation.useCase';
import { CompanyNotFoundException } from '@company/app/exception/CompanyNotFound.exception';

import { mockCompanyEventEmitter, mockCompanyRepository } from '@utils/mocks';

describe('[Application][Unit] Tests for AddEvaluationUseCase', () => {
  let useCase: AddEvaluationUseCase;

  let emitter: IEventEmitter;

  let repo: ICompanyRepository;

  beforeEach(() => {
    repo = mockCompanyRepository;
    emitter = mockCompanyEventEmitter;

    useCase = new AddEvaluationUseCase(repo, emitter);
  });

  it('should create a AddEvaluationUseCase', () => {
    expect(useCase).toBeInstanceOf(AddEvaluationUseCase);
  });

  it('should add a evaluation', async () => {
    const company = CompanyFactory.createMany(1, [])[0];
    jest.mocked(repo.findById).mockResolvedValue(company);
    const dto: InputAddEvaluationDto = {
      companyId: company.id,
      workerId: randomUUID(),
      categories: CategoryFactory.createMany(1)[0],
      comment: 'Comment',
    };

    await useCase.execute(dto);

    expect(repo.update).toHaveBeenCalledTimes(1);
    expect(emitter.emit).toHaveBeenCalledTimes(1);

    const eventName = jest.mocked(emitter.emit).mock.calls[0][0].name;
    expect(eventName).toBe('EvaluationAdded');
  });

  it('should throw an error when company not found', async () => {
    jest.mocked(repo.findById).mockResolvedValue(null);
    const dto: InputAddEvaluationDto = {
      companyId: randomUUID(),
      workerId: randomUUID(),
      categories: CategoryFactory.createMany(1)[0],
      comment: 'Comment',
    };

    const act = async () => await useCase.execute(dto);

    try {
      await act();
      fail('should throw an error');
    } catch (error) {
      expect(error).toBeInstanceOf(CompanyNotFoundException);
      expect(emitter.emit).not.toHaveBeenCalled();
    }
  });
});
