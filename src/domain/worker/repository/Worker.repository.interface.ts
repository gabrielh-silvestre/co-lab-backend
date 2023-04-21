export interface IWorkerRepository {
  findById(id: string): Promise<Worker | null>;
  create(worker: Worker): Promise<void>;
  update(worker: Worker): Promise<void>;
  delete(id: string): Promise<void>;
}
