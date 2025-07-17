import { UUID, Timestamp } from './common.types';

export type TicketStatus = 'open' | 'pending' | 'closed' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: UUID;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  requesterId: UUID;
  assigneeId?: UUID;
  tenantId: UUID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateTicketInput {
  subject: string;
  description: string;
  priority?: TicketPriority;
  requesterId: UUID;
  tenantId: UUID;
}

export interface UpdateTicketInput {
  subject?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assigneeId?: UUID;
}
