export interface InputUpdateWorkerDto {
  id: string;
  name?: string;
  age?: number;
  salary?: number;
}

export interface OutputUpdateWorkerDto {
  id: string;
  name: string;
  age: number;
  email: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}
