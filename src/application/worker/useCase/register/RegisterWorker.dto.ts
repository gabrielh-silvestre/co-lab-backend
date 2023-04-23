export interface InputRegisterWorkerDto {
  id: string;
  name: string;
  email: string;
  age?: number;
  salary?: number;
}

export interface OutputRegisterWorkerDto {
  id: string;
  name: string;
  age: number | null;
  salary: number | null;
  createdAt: Date;
  updatedAt: Date;
}
