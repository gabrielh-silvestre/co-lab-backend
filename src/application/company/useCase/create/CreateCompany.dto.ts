export interface InputCreateCompanyDto {
  name: string;
  description?: string;
  image?: string;
}

export interface OutputCreateCompanyDto {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
