
export type TicketStatus = 'open' | 'pending' | 'closed' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  departmentId: string;
  assigneeId?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  attachments?: string[];
} 