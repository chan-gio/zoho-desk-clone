export interface Workflow {
  id: string;
  name: string;
  rules: any; // JSON rules for workflow automation
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
} 