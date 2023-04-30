import { randomUUID } from 'node:crypto';

import type { AddEvaluationBody } from '@company/infra/controller/Company.controller.dto';

import { CategoryFactory } from '@evaluation/domain/value-object/category/Category.factory';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';
import { AddEvaluationValidationPipe } from '@company/infra/pipe/AddEvaluation.pipe';
import { PipeValidationException } from '@shared/infra/exception/PipeValidation.exception';

describe('[Infra][Unit] Tests for AddEvaluationValidationPipe', () => {
  let pipe: JoiValidationPipe;

  beforeEach(() => {
    pipe = new AddEvaluationValidationPipe();
  });

  it('should create a JoiValidationPipe', () => {
    expect(pipe).toBeDefined();
    expect(pipe).toBeInstanceOf(JoiValidationPipe);
  });

  it('should validate a valid body', () => {
    const categories: AddEvaluationBody['categories'] =
      CategoryFactory.createMany(1).map((category, i) => ({
        name: category[i].name,
        rating: category[i].rating,
      }));
    const body: AddEvaluationBody = {
      categories,
      workerId: randomUUID(),
      comment: 'comment',
    };

    const act = () => pipe.transform(body);

    expect(act).not.toThrow();
    expect(act()).toEqual(body);
  });

  it('should throw an InfraException when body is invalid', () => {
    const body = {
      workerId: randomUUID(),
      comment: 'comment',
    };

    const act = () => pipe.transform(body);

    try {
      act();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(PipeValidationException);
      expect(error.toHttp()).toBe(422);
    }
  });
});
