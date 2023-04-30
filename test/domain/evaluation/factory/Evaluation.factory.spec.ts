import { randomUUID } from 'node:crypto';

import { EvaluationFactory } from '@evaluation/domain/factory/Evaluation.factory';
import { CategoryFactory } from '@evaluation/domain/value-object/category/Category.factory';

import { Evaluation } from '@evaluation/domain/entity/Evaluation';

describe('[Domain][Unit] Tests for EvaluationFactory', () => {
  it('should create a new Evaluation', () => {
    const evaluation = EvaluationFactory.create({
      categories: CategoryFactory.createMany(1)[0],
      companyId: randomUUID(),
      workerId: randomUUID(),
      comment: 'comment',
    });

    expect(evaluation).toBeInstanceOf(Evaluation);
  });

  it('should create a new Evaluation without comment', () => {
    const evaluation = EvaluationFactory.create({
      categories: CategoryFactory.createMany(1)[0],
      companyId: randomUUID(),
      workerId: randomUUID(),
    });

    expect(evaluation).toBeInstanceOf(Evaluation);
  });

  it('should create a new Evaluation from repository', () => {
    const evaluation = EvaluationFactory.createFromPersistence({
      id: randomUUID(),
      categories: CategoryFactory.createMany(1)[0],
      companyId: randomUUID(),
      workerId: randomUUID(),
      comment: 'comment',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(evaluation).toBeInstanceOf(Evaluation);
  });

  it('should create many Evaluations', () => {
    const evaluations = EvaluationFactory.createMany(2);

    expect(evaluations).toHaveLength(2);
    evaluations.forEach((evaluation) =>
      expect(evaluation).toBeInstanceOf(Evaluation),
    );
  });
});
