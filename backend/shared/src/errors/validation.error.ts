import { BaseError } from './base.error';

export class ValidationError extends BaseError {
  constructor(message = 'Invalid input', details?: unknown) {
    super(message, 400, true, details);
  }
}
