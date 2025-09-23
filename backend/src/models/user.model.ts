import { UserRole } from './role.model.js';

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
  tenantId: string;
  departmentId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationTokenExpiry?: Date;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  tenantId: string;
  departmentId?: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role?: UserRole;
  isActive?: boolean;
  departmentId?: string;
}

export interface UserFilter {
  role?: UserRole[];
  isActive?: boolean;
  emailVerified?: boolean;
  tenantId?: string;
  departmentId?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
  tenantId: string;
  departmentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
