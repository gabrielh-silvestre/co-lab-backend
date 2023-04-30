import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';

import { Worker } from '@worker/domain/entity/Worker';

export class WorkerMemoryRepository implements IWorkerRepository {
  private workers: Worker[];

  constructor() {
    this.workers = [];
  }

  private findIndexById(id: string): number {
    return this.workers.findIndex((w) => w.id === id);
  }

  async findById(id: string): Promise<Worker | null> {
    return this.workers.find((w) => w.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<Worker | null> {
    return (
      this.workers.find(
        (w) => w.email.toLocaleLowerCase() === email.toLocaleLowerCase(),
      ) ?? null
    );
  }

  async create(worker: Worker): Promise<void> {
    const exists = await this.existsById(worker.id);
    if (exists) throw new Error('Register already exists');

    const existsEmail = await this.existsByEmail(worker.email);
    if (existsEmail) throw new Error('Register already exists');

    this.workers.push(worker);
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndexById(id);
    if (index === -1) throw new Error('Register not found');

    this.workers.splice(index, 1);
  }

  async existsById(id: string): Promise<boolean> {
    const worker = await this.findById(id);
    return !!worker;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const worker = await this.findByEmail(email);
    return !!worker;
  }

  populate(workers: Worker[]): WorkerMemoryRepository {
    this.workers = [...workers];
    return this;
  }
}
