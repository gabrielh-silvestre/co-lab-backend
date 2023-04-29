import { fail } from 'assert';

import type { ITestInput } from '@utils/types';
import type { ICompanyProps } from '@company/domain/entity/Company.interface';

import { CompanyJoiValidator } from '@company/domain/validator/joi/CompanyJoi.validator';
import { CompanyValidationException } from '@company/domain/exception/Validation.exception';

import { COMPANY } from '@utils/mocks/company.mock';

const INVALID_COMPANY_INPUTS: ITestInput<ICompanyProps>[] = [
  {
    meta: {
      title: 'id is not a valid UUID',
      expected: 'id must be a valid UUID',
    },
    data: {
      ...COMPANY,
      id: 'invalid-uuid',
    },
  },
  {
    meta: {
      title: 'name is not a string',
      expected: 'name must be a string',
    },
    data: {
      ...COMPANY,
      name: 123,
    },
  },
  {
    meta: {
      title: 'image is not a string',
      expected: 'image must be a string',
    },
    data: {
      ...COMPANY,
      image: 123,
    },
  },
  {
    meta: {
      title: 'description is not a string',
      expected: 'description must be a string',
    },
    data: {
      ...COMPANY,
      description: 123,
    },
  },
  {
    meta: {
      title: 'evaluations is not an array',
      expected: 'evaluations must be an array',
    },
    data: {
      ...COMPANY,
      evaluations: 123,
    },
  },
  {
    meta: {
      title: 'createdAt is not a Date',
      expected: 'createdAt must be a valid date',
    },
    data: {
      ...COMPANY,
      createdAt: '2021X09X01',
    },
  },
  {
    meta: {
      title: 'updatedAt is not a Date',
      expected: 'updatedAt must be a valid date',
    },
    data: {
      ...COMPANY,
      updatedAt: '2021X09X01',
    },
  },
] as ITestInput<ICompanyProps>[];

const INVALID_COMPANY_NAMES: ITestInput<ICompanyProps>[] = [
  {
    meta: {
      title: 'name is too short',
      expected: 'name must be at least 4 characters long',
    },
    data: {
      ...COMPANY,
      name: 'abc',
    },
  },
  {
    meta: {
      title: 'name is too long',
      expected: 'name must be at most 50 characters long',
    },
    data: {
      ...COMPANY,
      name: 'a'.repeat(51),
    },
  },
  {
    meta: {
      title: 'name is empty',
      expected: 'name cannot be empty',
    },
    data: {
      ...COMPANY,
      name: '',
    },
  },
];

const INVALID_COMPANY_DESCRIPTIONS: ITestInput<ICompanyProps>[] = [
  {
    meta: {
      title: 'description is empty',
      expected: 'description cannot be empty',
    },
    data: {
      ...COMPANY,
      description: '',
    },
  },
  {
    meta: {
      title: 'description is too long',
      expected: 'description must be at most 255 characters long',
    },
    data: {
      ...COMPANY,
      description: 'a'.repeat(256),
    },
  },
];

describe('[Domain][Unit] Tests for CompanyJoiValidator', () => {
  it.each(INVALID_COMPANY_INPUTS)(
    'should throw an error when $meta.title',
    async ({ data, meta }) => {
      const validator = new CompanyJoiValidator();

      const act = () => validator.validate(data);

      try {
        act();
        fail('should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(CompanyValidationException);
        expect(error.message).toContain(meta.expected);
        expect(error.toHttp()).toBe(400);
      }
    },
  );

  it.each(INVALID_COMPANY_NAMES)(
    'should throw an error when $meta.title',
    async ({ data, meta }) => {
      const validator = new CompanyJoiValidator();

      const act = () => validator.validate(data);

      try {
        act();
        fail('should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(CompanyValidationException);
        expect(error.message).toContain(meta.expected);
        expect(error.toHttp()).toBe(400);
      }
    },
  );

  it.each(INVALID_COMPANY_DESCRIPTIONS)(
    'should throw an error when $meta.title',
    async ({ data, meta }) => {
      const validator = new CompanyJoiValidator();

      const act = () => validator.validate(data);

      try {
        act();
        fail('should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(CompanyValidationException);
        expect(error.message).toContain(meta.expected);
        expect(error.toHttp()).toBe(400);
      }
    },
  );
});
