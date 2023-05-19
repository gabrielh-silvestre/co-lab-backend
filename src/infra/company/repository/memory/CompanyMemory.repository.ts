import type { ICompany } from '@company/domain/entity/Company.interface';
import type {
  CompanyQuery,
  ICompanyRepository,
} from '@company/domain/repository/Company.repository.interface';

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

  async search(query?: CompanyQuery): Promise<ICompany[]> {
    if (!query) return this.companies;

    const { search, limit, offset } = query;

    let companies = [...this.companies];

    if (search) {
      companies = companies.filter((c) =>
        c[search.field].includes(search.value),
      );
    }

    if (limit) {
      companies = companies.slice(
        Number(offset ?? 0),
        Number(offset ?? 0) + Number(limit),
      );
    }

    return companies;
  }

  async getLatestEvaluated(n: number): Promise<ICompany[]> {
    return this.companies
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
      .slice(0, n);
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
