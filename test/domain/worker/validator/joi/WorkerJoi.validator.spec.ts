import { DomainException } from '@shared/domain/exception/Domain.exception';
import { WorkerJoiValidator } from '@worker/domain/validator/joi/WorkerJoi.validator';
import { randomUUID } from 'node:crypto';

const UUID = randomUUID();
const WORKER_INPUT = {
  id: UUID,
  name: 'name',
  age: 18,
  salary: 1700,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const INVALID_WORKER_INPUTS = [
  {
    meta: {
      title: 'id is not a valid UUID',
      expectedError: 'id must be a valid UUID',
    },
    data: {
      ...WORKER_INPUT,
      id: 'invalid-uuid',
    },
  },
  {
    meta: {
      title: 'name is not a string',
      expectedError: 'name must be a string',
    },
    data: {
      ...WORKER_INPUT,
      name: 123,
    },
  },
  {
    meta: {
      title: 'age is not a number',
      expectedError: 'age must be a number',
    },
    data: {
      ...WORKER_INPUT,
      age: '18',
    },
  },
  {
    meta: {
      title: 'salary is not a number',
      expectedError: 'salary must be a number',
    },
    data: {
      ...WORKER_INPUT,
      salary: '1700',
    },
  },
  {
    meta: {
      title: 'createdAt is not a Date',
      expectedError: 'createdAt must be a valid date',
    },
    data: {
      ...WORKER_INPUT,
      createdAt: '2021-09-01',
    },
  },
  {
    meta: {
      title: 'updatedAt is not a Date',
      expectedError: 'updatedAt must be a valid date',
    },
    data: {
      ...WORKER_INPUT,
      updatedAt: '2021-09-01',
    },
  },
];

const INVALID_WORKER_NAMES = [
  {
    meta: {
      title: 'name is too short',
      expectedError: 'name must be at least 4 characters long',
    },
    data: {
      ...WORKER_INPUT,
      name: 'abc',
    },
  },
  {
    meta: {
      title: 'name is too long',
      expectedError: 'name must be at most 50 characters long',
    },
    data: {
      ...WORKER_INPUT,
      name: 'a'.repeat(51),
    },
  },
  {
    meta: {
      title: 'name is empty',
      expectedError: 'name cannot be empty',
    },
    data: {
      ...WORKER_INPUT,
      name: '',
    },
  },
];
const INVALID_WORKER_AGES = [
  {
    meta: {
      title: 'age is too low',
      expectedError: 'age must be at least 16',
    },
    data: {
      ...WORKER_INPUT,
      age: 15,
    },
  },
  {
    meta: {
      title: 'age is not an integer',
      expectedError: 'age must be an integer',
    },
    data: {
      ...WORKER_INPUT,
      age: 18.5,
    },
  },
];

describe('[Domain][Unit] Tests for WorkerJoiValidator', () => {
  it.each(INVALID_WORKER_INPUTS)(
    'should throw an error when $meta.title',
    ({ meta, data }) => {
      const input = data as any;
      const validator = new WorkerJoiValidator();

      const act = () =>
        validator.validate({
          id: input.id,
          name: input.name,
          age: input.age,
          salary: input.salary,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        });

      try {
        act();
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe(meta.expectedError);
      }
    },
  );

  it.each(INVALID_WORKER_NAMES)(
    'should throw an error when $meta.title',
    ({ meta, data }) => {
      const input = data as any;
      const validator = new WorkerJoiValidator();

      const act = () =>
        validator.validate({
          id: input.id,
          name: input.name,
          age: input.age,
          salary: input.salary,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        });

      try {
        act();
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe(meta.expectedError);
      }
    },
  );

  it.each(INVALID_WORKER_AGES)(
    'should throw an error when $meta.title',
    ({ meta, data }) => {
      const input = data as any;
      const validator = new WorkerJoiValidator();

      const act = () =>
        validator.validate({
          id: input.id,
          name: input.name,
          age: input.age,
          salary: input.salary,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        });

      try {
        act();
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe(meta.expectedError);
      }
    },
  );
});
