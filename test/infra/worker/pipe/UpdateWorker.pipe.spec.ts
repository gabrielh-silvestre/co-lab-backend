import { JoiValidationPipe } from '@shared/infra/pipe/validation/JoiValidation.pipe';
import { UpdateWorkerPipe } from '@worker/infra/pipe/UpdateWorker.pipe';

import { PipeValidationException } from '@shared/infra/exception/PipeValidation.exception';

describe('[Infra][Unit] Tests for RegisterWorkValidationPipe', () => {
  let pipe: JoiValidationPipe;

  beforeEach(() => {
    pipe = new UpdateWorkerPipe();
  });

  it('should create a JoiValidationPipe', () => {
    expect(pipe).toBeDefined();
    expect(pipe).toBeInstanceOf(JoiValidationPipe);
  });

  it('should validate a valid body', () => {
    const body = {
      name: 'name',
      age: 10,
      salary: 1000,
    };

    const act = () => pipe.transform(body);

    expect(act).not.toThrow();
    expect(act()).toEqual(body);
  });

  it('should throw an InfraException when body is invalid', () => {
    const body = {
      name: 'name',
      age: 'invalid-age',
      salary: 1000,
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

  it('should throw an InfraException when body is empty', () => {
    const body = {};

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
