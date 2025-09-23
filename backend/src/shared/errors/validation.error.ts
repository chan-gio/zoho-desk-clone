import { BaseError } from './base.error.js';

export class ValidationError extends BaseError {
  constructor(message = 'Invalid input', details?: unknown) {
    super(message, 400, true, details);
  }
}
