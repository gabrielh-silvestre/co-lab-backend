import { randomUUID } from 'node:crypto';

import type { RegisterWorkerBody } from '@worker/infra/controller/Woker.controller.dto';

import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';
import { RegisterWorkerPipe } from '@worker/infra/pipe/RegisterWorker.pipe';

import { PipeValidationException } from '@shared/infra/exception/PipeValidation.exception';

describe('[Infra][Unit] Tests for RegisterWorkValidationPipe', () => {
  let pipe: JoiValidationPipe;

  beforeEach(() => {
    pipe = new RegisterWorkerPipe();
  });

  it('should create a JoiValidationPipe', () => {
    expect(pipe).toBeDefined();
    expect(pipe).toBeInstanceOf(JoiValidationPipe);
  });

  it('should validate a valid body', () => {
    const body: RegisterWorkerBody = {
      id: randomUUID(),
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
      expect(error).toBeInstanceOf(PipeValidationException);
      expect(error.toHttp()).toBe(422);
    }
  });
});
