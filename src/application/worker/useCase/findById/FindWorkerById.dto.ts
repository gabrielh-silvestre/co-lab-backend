export interface InputFindWorkerByIdDto {
  id: string;
}

export interface OutputFindWorkerByIdDto {
  id: string;
  name: string;
  age: number;
  salary: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
