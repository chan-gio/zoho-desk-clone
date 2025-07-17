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

/**
 * AuthenticatedUser is used for the authentication context (req.user) and should match the JWT payload structure.
 * It extends User and includes accessToken for session context.
 */
export interface AuthenticatedUser extends User {
  accessToken: string;
}

/**
 * JwtPayload is the minimal structure encoded/decoded in JWT tokens for authentication.
 * Should include only fields actually present in the JWT.
 */
export interface JwtPayload {
  id: UUID;
  tenantId: UUID;
  email: string;
  name: string;
  role: Role;
  // Add other fields if present in your JWT
}
