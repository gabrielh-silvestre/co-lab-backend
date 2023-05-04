import type { ICompanyProps } from '@company/domain/entity/Company.interface';

export type Query = {
  search?: {
    field: keyof Partial<Pick<ICompanyProps, 'name' | 'description'>>;
    value: string;
  };
};

export type Pagination = {
  limit?: number;
  offset?: number;
};

export interface InputSearchCompanyDto {
  query?: Query;
  pagination?: Pagination;
}

export interface OutputSearchCompanyDto {
  id: string;
  name: string;
  image: string | null;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
