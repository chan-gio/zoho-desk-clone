export type UUID = string;

export type Timestamp = string; // ISO 8601 format

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type Role = 'admin' | 'agent' | 'customer';

export interface TenantInfo {
  tenantId: UUID;
  tenantName: string;
}
