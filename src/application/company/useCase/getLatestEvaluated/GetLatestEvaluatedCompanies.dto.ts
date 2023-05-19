export interface InputGetLatestEvaluatedCompaniesDto {
  size?: number;
}

export interface OutputGetLatestEvaluatedCompaniesDto {
  id: string;
  name: string;
  image: string | null;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
