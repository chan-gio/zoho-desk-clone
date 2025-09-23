export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  CUSTOMER = 'customer',
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
