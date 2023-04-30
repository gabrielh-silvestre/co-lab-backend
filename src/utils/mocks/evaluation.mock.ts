import { randomUUID } from 'node:crypto';

import type { IEvaluationProps } from '@evaluation/domain/entity/Evaluation.interface';

import {
  CreateEvaluationProps,
  EvaluationFactory,
} from '@evaluation/domain/factory/Evaluation.factory';

export const EVALUATION_INPUT: CreateEvaluationProps = {
  workerId: randomUUID(),
  companyId: randomUUID(),
  categories: [],
  comment: 'comment',
};

export const EVALUATION: IEvaluationProps =
  EvaluationFactory.createMany(1)[0].toObject();
