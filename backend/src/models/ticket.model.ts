export type TicketStatus = 'open' | 'in_progress' | 'closed' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  order: number; // Thứ tự trong column
  columnId?: string; // ID của column chứa ticket này
  departmentId?: string;
  assigneeId?: string;
  creatorId: string;
  tenantId: string;
  tags?: string[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  closedAt?: Date;
  resolvedAt?: Date;
  dueDate?: Date;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  rating?: number; // 1-5
  feedback?: string;
}

export interface CreateTicketInput {
  title: string;
  description?: string;
  priority?: TicketPriority;
  columnId?: string; // Column để đặt ticket
  departmentId?: string;
  assigneeId?: string;
  tags?: string[];
  dueDate?: Date;
  estimatedTime?: number;
  tenantId: string;
  creatorId: string;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  columnId?: string; // Di chuyển ticket sang column khác
  order?: number; // Cập nhật thứ tự trong column
  departmentId?: string;
  assigneeId?: string;
  tags?: string[];
  dueDate?: Date;
  estimatedTime?: number;
  actualTime?: number;
  rating?: number;
  feedback?: string;
}

export interface TicketFilter {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  departmentId?: string;
  assigneeId?: string;
  creatorId?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}
