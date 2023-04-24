import * as Joi from 'joi';

import { JoiValidationPipe } from '@worker/infra/pipe/validation/JoiValidation.pipe';
import { InfraException } from '@shared/infra/exception/Infra.exception';

describe('[Infra][Unit] Tests for JoiValidationPipe', () => {
  let pipe: JoiValidationPipe;

  beforeEach(() => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    pipe = new JoiValidationPipe(schema);
  });

  it('should create a JoiValidationPipe', () => {
    expect(pipe).toBeDefined();
    expect(pipe).toBeInstanceOf(JoiValidationPipe);
  });

  it('should validate a valid body', () => {
    const body = {
      name: 'name',
      email: 'email@email.com',
    };

    const act = () => pipe.transform(body);

    expect(act).not.toThrow();
    expect(act()).toEqual(body);
  });

  it('should throw an InfraException when body is invalid', () => {
    const body = {
      name: 'name',
      email: 'invalid-email',
    };

    const act = () => pipe.transform(body);

    try {
      act();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(InfraException);
      expect(error.toHttp()).toBe(422);
    }
  });
});
