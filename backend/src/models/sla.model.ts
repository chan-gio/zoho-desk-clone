export interface Priority {
  id: string;
  name: string;
  color: string;
}

export interface SLA {
  id: string;
  name: string;
  description?: string;
  responseTime: number; // in hours
  resolutionTime: number; // in hours
  priority?: Priority | undefined;
  priorityId?: string | undefined;
  departmentId?: string;
  tenantId: string;
  isActive: boolean;
  escalationRules: SLAEscalationRule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SLAEscalationRule {
  level: number;
  timeThreshold: number; // in hours
  actions: SLAEscalationAction[];
  notifyUsers: string[]; // user IDs
  notifyGroups: string[]; // group IDs
}

export interface SLAEscalationAction {
  type: 'assign' | 'change_priority' | 'send_notification' | 'create_task' | 'escalate_to_manager';
  parameters: Record<string, any>;
}

export interface SLABreach {
  id: string;
  ticketId: string;
  slaId: string;
  breachType: 'response' | 'resolution';
  expectedTime: Date;
  actualTime?: Date;
  breachDuration: number; // in minutes
  isResolved: boolean;
  resolvedAt?: Date;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSLAInput {
  name: string;
  description?: string;
  responseTime: number;
  resolutionTime: number;
  priorityId?: string;
  departmentId?: string;
  tenantId: string;
  escalationRules?: Omit<SLAEscalationRule, 'level'>[];
}

export interface UpdateSLAInput {
  name?: string;
  description?: string;
  responseTime?: number;
  resolutionTime?: number;
  priorityId?: string;
  departmentId?: string;
  isActive?: boolean;
  escalationRules?: Omit<SLAEscalationRule, 'level'>[];
}

export interface SLAFilter {
  priority?: string[];
  departmentId?: string;
  isActive?: boolean;
  tenantId?: string;
}
