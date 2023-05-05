export type RegisterWorkerBody = {
  id: string;
  name: string;
  email: string;
};

export type UpdateWorkerBody = {
  name?: string;
  age?: number;
  salary?: number;
};
