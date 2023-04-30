import type { IValidator } from '@shared/domain/validator/Validator.interface';
import type { ICompanyProps } from '../entity/Company.interface';

export type ICompanyValidator = IValidator<ICompanyProps>;
