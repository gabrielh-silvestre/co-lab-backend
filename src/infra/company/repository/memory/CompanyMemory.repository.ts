import type { ICompany } from '@company/domain/entity/Company.interface';
import type { ICompanyRepository } from '@company/domain/repository/Company.repository.interface';

export class CompanyMemoryRepository implements ICompanyRepository {
  private companies: ICompany[];

  constructor() {
    this.companies = [];
  }

  private existsById(id: string): boolean {
    return !!this.companies.find((c) => c.id === id);
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
    const exists = this.existsById(company.id);
    if (exists) throw new Error('Register already exists');

    this.companies.push(company);
  }

  populate(companies: ICompany[]): CompanyMemoryRepository {
    this.companies = [...companies];
    return this;
  }
}
