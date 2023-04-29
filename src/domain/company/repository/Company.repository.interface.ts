import type { ICompany } from '../entity/Company.interface';

export interface ICompanyRepository {
  findById(id: string): Promise<ICompany | null>;
  searchByName(name: string): Promise<ICompany[]>;

  create(company: ICompany): Promise<void>;
}
