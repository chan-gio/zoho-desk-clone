import { BaseError } from './base.error';

export class ConflictError extends BaseError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class BusinessRuleViolationError extends BaseError {
  constructor(message = 'Business rule violated', details?: unknown) {
    super(message, 422, true, details);
  }
}
