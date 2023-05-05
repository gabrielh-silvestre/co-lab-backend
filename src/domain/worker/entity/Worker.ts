import type { IWorker, IWorkerProps } from './Worker.interface';
import type { IEventEmitter } from '@shared/domain/event/Event.emitter.interface';

import { WorkerValidatorFactory } from '../factory/WorkerValidator.factory';
import { WorkerEventFactory } from '../factory/WorkerEvent.factory';

import { WorkerValidationException } from '../exception/Validation.exception';

export class Worker implements IWorker {
  private props: IWorkerProps;

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

  changeName(emitter: IEventEmitter, name: string): void {
    if (name === this.props.name) {
      throw new WorkerValidationException('Worker "name" is equal');
    }

    this.props = { ...this.props, name, updatedAt: new Date() };

    this.validate();
    emitter.emit(WorkerEventFactory.changedName(this));
  }

  changeAge(emitter: IEventEmitter, age: number): void {
    if (age === this.props.age) {
      throw new WorkerValidationException('Worker "age" is equal');
    }

    this.props = { ...this.props, age, updatedAt: new Date() };

    this.validate();
    emitter.emit(WorkerEventFactory.changedAge(this));
  }

  changeSalary(emitter: IEventEmitter, salary: number): void {
    if (salary === this.props.salary) {
      throw new WorkerValidationException('Worker "salary" is equal');
    }

    this.props = { ...this.props, salary, updatedAt: new Date() };

    this.validate();
    emitter.emit(WorkerEventFactory.changedSalary(this));
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
    return JSON.parse(JSON.stringify(this.props));
  }
}
