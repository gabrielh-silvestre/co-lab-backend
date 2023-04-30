import type { ICompanyValidator } from '../validator/Company.validator.interface';

import { CompanyJoiValidator } from '../validator/joi/CompanyJoi.validator';

export class CompanyValidatorFactory {
  static create(): ICompanyValidator {
    return new CompanyJoiValidator();
  }
}
