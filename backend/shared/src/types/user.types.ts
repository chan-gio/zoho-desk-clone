import { UUID, Role, Timestamp } from './common.types';

export interface User {
  id: UUID;
  email: string;
  name: string;
  role: Role;
  tenantId: UUID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  role: Role;
  tenantId: UUID;
}

export interface UpdateUserInput {
  name?: string;
  password?: string;
  role?: Role;
}

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthenticatedUser extends User {
  accessToken: string;
}
