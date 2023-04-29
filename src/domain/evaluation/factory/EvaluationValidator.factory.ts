import type { IEvaluationValidator } from '../validator/Evaluation.validator.interface';

import { EvaluationJoiValidator } from '../validator/joi/EvaluationJoi.validator';

export class EvaluationValidatorFactory {
  static create(): IEvaluationValidator {
    return new EvaluationJoiValidator();
  }
}
