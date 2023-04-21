import type { ITestInput } from '@utils/types';
import type { IWorkerProps } from '@worker/domain/entity/Worker.interface';

import { WorkerJoiValidator } from '@worker/domain/validator/joi/WorkerJoi.validator';
import { DomainException } from '@shared/domain/exception/Domain.exception';

import { WORKER } from '@utils/mocks';

const INVALID_WORKER_INPUTS: ITestInput<IWorkerProps>[] = [
  {
    meta: {
      title: 'id is not a valid UUID',
      expected: 'id must be a valid UUID',
    },
    data: {
      ...WORKER,
      id: 'invalid-uuid',
    },
  },
  {
    meta: {
      title: 'name is not a string',
      expected: 'name must be a string',
    },
    data: {
      ...WORKER,
      name: 123,
    },
  },
  {
    meta: {
      title: 'age is not a number',
      expected: 'age must be a number',
    },
    data: {
      ...WORKER,
      age: '18',
    },
  },
  {
    meta: {
      title: 'salary is not a number',
      expected: 'salary must be a number',
    },
    data: {
      ...WORKER,
      salary: '1700',
    },
  },
  {
    meta: {
      title: 'createdAt is not a Date',
      expected: 'createdAt must be a valid date',
    },
    data: {
      ...WORKER,
      createdAt: '2021-09-01',
    },
  },
  {
    meta: {
      title: 'updatedAt is not a Date',
      expected: 'updatedAt must be a valid date',
    },
    data: {
      ...WORKER,
      updatedAt: '2021-09-01',
    },
  },
] as ITestInput<IWorkerProps>[];

const INVALID_WORKER_NAMES: ITestInput<IWorkerProps>[] = [
  {
    meta: {
      title: 'name is too short',
      expected: 'name must be at least 4 characters long',
    },
    data: {
      ...WORKER,
      name: 'abc',
    },
  },
  {
    meta: {
      title: 'name is too long',
      expected: 'name must be at most 50 characters long',
    },
    data: {
      ...WORKER,
      name: 'a'.repeat(51),
    },
  },
  {
    meta: {
      title: 'name is empty',
      expected: 'name cannot be empty',
    },
    data: {
      ...WORKER,
      name: '',
    },
  },
];

const INVALID_WORKER_AGES: ITestInput<IWorkerProps>[] = [
  {
    meta: {
      title: 'age is too low',
      expected: 'age must be at least 16',
    },
    data: {
      ...WORKER,
      age: 15,
    },
  },
  {
    meta: {
      title: 'age is not an integer',
      expected: 'age must be an integer',
    },
    data: {
      ...WORKER,
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
          email: input.email,
          age: input.age,
          salary: input.salary,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        });

      try {
        act();
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toContain(meta.expected);
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
          email: input.email,
          age: input.age,
          salary: input.salary,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        });

      try {
        act();
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toContain(meta.expected);
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
          email: input.email,
          age: input.age,
          salary: input.salary,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        });

      try {
        act();
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toContain(meta.expected);
      }
    },
  );
});
