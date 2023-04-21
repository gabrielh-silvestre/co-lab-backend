import { randomUUID } from 'node:crypto';

import type { IWorkerProps } from '../entity/Worker.interface';

import { Worker } from '../entity/Worker';

export type CreateWorkerProps = {
  id: string;
  name: string;
  email: string;
  age: number;
  salary: number;
};

export class WorkerFactory {
  static create({ id, name, email, age, salary }: CreateWorkerProps): Worker {
    return new Worker(id, name, email, age, salary, new Date(), new Date());
  }

  static createFromRepository(props: IWorkerProps): Worker {
    return new Worker(
      props.id,
      props.name,
      props.email,
      props.age,
      props.salary,
      props.createdAt,
      props.updatedAt,
    );
  }

  static createMany(n: number): Worker[] {
    return Array.from({ length: n }, () => {
      const id = randomUUID();
      const name = 'name';
      const email = `${id}@email.com`;
      const age = Math.floor(Math.random() * 100) + 16;
      const salary = Math.floor(Math.random() * 10000) + 1000;

      return new Worker(id, name, email, age, salary, new Date(), new Date());
    });
  }
}
