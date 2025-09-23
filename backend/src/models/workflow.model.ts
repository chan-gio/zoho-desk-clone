export interface Workflow {
  id: string;
  name: string;
  description?: string;
  rules: WorkflowRule[];
  tenantId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowRule {
  id: string;
  name: string;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  order: number;
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: any;
}

export interface WorkflowAction {
  type: 'assign' | 'change_status' | 'change_priority' | 'send_notification' | 'add_tag' | 'remove_tag';
  value: any;
  parameters?: Record<string, any>;
}

export interface CreateWorkflowInput {
  name: string;
  description?: string;
  rules: Omit<WorkflowRule, 'id'>[];
  tenantId: string;
}

export interface UpdateWorkflowInput {
  name?: string;
  description?: string;
  rules?: Omit<WorkflowRule, 'id'>[];
  isActive?: boolean;
}
