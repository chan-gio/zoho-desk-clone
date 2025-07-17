export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CUSTOMER: 'customer',
} as const;

export const TICKET_STATUSES = ['open', 'pending', 'resolved', 'closed'] as const;

export const TICKET_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export const API_PREFIX = '/api/v1';

export const TOKEN_HEADER = 'Authorization';
