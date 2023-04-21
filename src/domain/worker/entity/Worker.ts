import type { IWorker, IWorkerProps } from './Worker.interface';

import { WorkerValidatorFactory } from '../factory/WorkerValidator.factory';

export class Worker implements IWorker {
  private readonly props: IWorkerProps;

  constructor(
    id: string,
    name: string,
    age: number,
    salary: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.props = {
      id,
      name,
      age,
      salary,
      createdAt,
      updatedAt,
    };

    this.validate();
  }

  private validate(): void {
    WorkerValidatorFactory.create().validate(this.props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get age(): number {
    return this.props.age;
  }

  get salary(): number {
    return this.props.salary;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toObject(): IWorkerProps {
    return { ...this.props };
  }
}
