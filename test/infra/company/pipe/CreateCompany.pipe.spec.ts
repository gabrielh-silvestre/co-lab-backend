import type { CreateCompanyBody } from '@company/infra/controller/Company.controller.dto';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';
import { CreateCompanyValidationPipe } from '@company/infra/pipe/CreateCompany.pipe';

import { PipeValidationException } from '@shared/infra/exception/PipeValidation.exception';

describe('[Infra][Unit] Tests for CreateCompanyValidationPipe', () => {
  let pipe: JoiValidationPipe;

  beforeEach(() => {
    pipe = new CreateCompanyValidationPipe();
  });

  it('should create a JoiValidationPipe', () => {
    expect(pipe).toBeDefined();
    expect(pipe).toBeInstanceOf(JoiValidationPipe);
  });

  it('should validate a valid body', () => {
    const body: CreateCompanyBody = {
      name: 'name',
      description: 'description',
      image: 'image',
    };

    const act = () => pipe.transform(body);

    expect(act).not.toThrow();
    expect(act()).toEqual(body);
  });

  it('should throw an InfraException when body is invalid', () => {
    const body = {
      description: 'description',
      image: 'image',
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
