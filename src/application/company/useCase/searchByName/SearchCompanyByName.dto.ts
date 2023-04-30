export interface InputSearchCompanyByNameDto {
  name: string;
}

export interface OutputSearchCompanyByNameDto {
  id: string;
  name: string;
  image: string | null;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
