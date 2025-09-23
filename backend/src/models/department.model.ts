export interface Department {
  id: string;
  name: string;
  description?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDepartmentInput {
  name: string;
  description?: string;
  tenantId: string;
}

export interface UpdateDepartmentInput {
  name?: string;
  description?: string;
}
