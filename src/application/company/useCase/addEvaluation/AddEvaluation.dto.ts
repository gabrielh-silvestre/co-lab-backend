export type SearchEvaluationCategoryDto = {
  name: string;
  rating: number;
};

export interface InputAddEvaluationDto {
  workerId: string;
  companyId: string;
  comment?: string;
  categories: SearchEvaluationCategoryDto[];
}
