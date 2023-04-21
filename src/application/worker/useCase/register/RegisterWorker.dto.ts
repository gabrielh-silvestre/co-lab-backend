export interface InputRegisterWorkerDto {
  id: string;
  name: string;
  email: string;
  age: number;
  salary: number;
}

export interface OutputRegisterWorkerDto {
  id: string;
  name: string;
  age: number;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}
