export type CreateCompanyBody = {
  name: string;
  description?: string;
  image?: string;
};

export type AddEvaluationBody = {
  workerId: string;
  comment?: string;
  categories: {
    name: string;
    rating: number;
  }[];
};
