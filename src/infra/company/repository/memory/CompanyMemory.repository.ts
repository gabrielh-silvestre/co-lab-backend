import type { ICompany } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';

export class CompanyMemoryRepository implements ICompanyRepository {
  private companies: ICompany[];

  constructor() {
    this.companies = [];
  }

  private findIndexById(id: string): number {
    return this.companies.findIndex((c) => c.id === id);
  }

  async findById(id: string): Promise<ICompany> {
    return this.companies.find((c) => c.id === id) ?? null;
  }

  async searchByName(name: string): Promise<ICompany[]> {
    return this.companies.filter((c) =>
      c.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
    );
  }

  async create(company: ICompany): Promise<void> {
    this.companies.push(company);
  }

  async update(company: ICompany): Promise<void> {
    const index = this.findIndexById(company.id);
    if (index === -1) throw new Error('Register not found');

    this.companies[index] = company;
  }

  populate(companies: ICompany[]): CompanyMemoryRepository {
    this.companies = [...companies];
    return this;
  }
}
