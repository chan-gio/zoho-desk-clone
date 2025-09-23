export interface Metrics {
  id: string;
  tenantId: string;
  type: 'ticket' | 'agent' | 'department' | 'sla' | 'customer_satisfaction';
  name: string;
  value: number;
  unit?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface TicketMetrics {
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
  avgResolutionTime: number; // in hours
  avgResponseTime: number; // in hours
  slaCompliance: number; // percentage
  customerSatisfaction: number; // average rating
  period: string;
}

export interface AgentMetrics {
  agentId: string;
  ticketsHandled: number;
  avgResolutionTime: number;
  avgRating: number;
  responseTime: number;
  period: string;
}

export interface DepartmentMetrics {
  departmentId: string;
  ticketsCount: number;
  avgResolutionTime: number;
  avgRating: number;
  period: string;
}

export interface SLAMetrics {
  totalTickets: number;
  slaBreaches: number;
  complianceRate: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  period: string;
}
