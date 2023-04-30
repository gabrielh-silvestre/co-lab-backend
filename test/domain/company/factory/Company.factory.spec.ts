import { randomUUID } from 'node:crypto';

import { Company } from '@company/domain/entity/Company';
import { CompanyFactory } from '@company/domain/factory/Company.factory';

describe('[Domain][Unit] Tests for CompanyFactory', () => {
  it('should create a new Company', () => {
    const company = CompanyFactory.create({
      name: 'name',
    });

    expect(company).toBeInstanceOf(Company);
  });

  it('should create a new Company without description and image', () => {
    const company = CompanyFactory.create({
      name: 'name',
      description: 'description',
      image: 'image',
    });

    expect(company).toBeInstanceOf(Company);
  });

  it('should create a new Company from repository', () => {
    const company = CompanyFactory.createFromPersistence({
      id: randomUUID(),
      name: 'name',
      image: null,
      description: null,
      evaluations: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(company).toBeInstanceOf(Company);
  });

  it('should create many Companies', () => {
    const companies = CompanyFactory.createMany(2, []);

    expect(companies).toHaveLength(2);
    companies.forEach((company) => expect(company).toBeInstanceOf(Company));
  });
});
