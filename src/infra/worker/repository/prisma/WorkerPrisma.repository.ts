import { Injectable } from '@nestjs/common';

import type { IWorkerRepository } from '@worker/domain/repository/Worker.repository.interface';

import { Worker } from '@worker/domain/entity/Worker';
import { WorkerFactory } from '@worker/domain/factory/Worker.factory';

import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class WorkerPrismaRepository implements IWorkerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Worker> {
    const foundWorker = await this.prisma.worker.findUnique({ where: { id } });

    if (!foundWorker) return null;

    return WorkerFactory.createFromRepository(foundWorker);
  }

  async findByEmail(email: string): Promise<Worker> {
    const foundWorker = await this.prisma.worker.findUnique({
      where: { email },
    });

    if (!foundWorker) return null;

    return WorkerFactory.createFromRepository(foundWorker);
  }

  async create(worker: Worker): Promise<void> {
    await this.prisma.worker.create({
      data: worker.toObject(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.worker.delete({ where: { id } });
  }

  async existsById(id: string): Promise<boolean> {
    const foundWorker = await this.prisma.worker.count({ where: { id } });

    return foundWorker > 0;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const foundWorker = await this.prisma.worker.count({ where: { email } });

    return foundWorker > 0;
  }
}
