export interface InputFindCompanyByIdDto {
  id: string;
}

export type FindCompanyByIdCategoryDto = {
  name: string;
  rating: number;
};

export type FindCompanyByIdEvaluationDto = {
  id: string;
  comment: string | null;
  rating: number;
  categories: FindCompanyByIdCategoryDto[];
  createdAt: Date;
  updatedAt: Date;
};

export interface OutputFindCompanyByIdDto {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  rating: number;
  evaluations: FindCompanyByIdEvaluationDto[];
  createdAt: Date;
  updatedAt: Date;
}
