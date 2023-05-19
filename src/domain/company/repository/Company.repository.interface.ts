import type { ICompany, ICompanyProps } from '../entity/Company.interface';

export type CompanySearchParams = keyof Partial<
  Pick<ICompanyProps, 'name' | 'description'>
>;

export interface CompanySearch {
  field: CompanySearchParams;
  value: string;
}

export interface CompanyQuery {
  search?: CompanySearch;
  limit?: number;
  offset?: number;
}

export interface ICompanyRepository {
  findById(id: string): Promise<ICompany | null>;
  search(query?: CompanyQuery): Promise<ICompany[]>;

  getLatestEvaluated(n: number): Promise<ICompany[]>;

  create(company: ICompany): Promise<void>;
  update(company: ICompany): Promise<void>;
}
