import type { IWorker, IWorkerProps } from './Worker.interface';

import { WorkerValidatorFactory } from '../factory/WorkerValidator.factory';

export class Worker implements IWorker {
  private readonly props: IWorkerProps;

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    age?: number,
    salary?: number,
  ) {
    this.props = {
      id,
      name,
      email,
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

  get email(): string {
    return this.props.email;
  }

  get age(): number {
    return this.props.age ?? null;
  }

  get salary(): number {
    return this.props.salary ?? null;
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
