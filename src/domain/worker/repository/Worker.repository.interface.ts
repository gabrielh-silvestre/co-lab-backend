import type { Worker } from '../entity/Worker';

export interface IWorkerRepository {
  findById(id: string): Promise<Worker | null>;
  findByEmail(email: string): Promise<Worker | null>;

  create(worker: Worker): Promise<void>;
  delete(id: string): Promise<void>;

  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
