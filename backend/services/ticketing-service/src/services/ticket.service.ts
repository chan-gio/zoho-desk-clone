import { TicketRepository } from '../repositories/ticket.repository';
import { NotificationService } from './notification.service';
import { WorkflowService } from './workflow.service';
import { Prisma, PrismaClient } from '../../../../shared/prisma/generated/client';

export class TicketService {
  constructor(
    private ticketRepo: TicketRepository,
    private notificationService: NotificationService,
    private workflowService: WorkflowService,
    private prisma: PrismaClient
  ) {}

  async createTicket(data: Prisma.TicketUncheckedCreateInput) {
    // Auto-assign logic
    let assigneeId = data.assigneeId;
    if (!assigneeId && data.departmentId && data.tenantId) {
      assigneeId = await this.workflowService.autoAssign(data.departmentId, data.tenantId);
    }
    const ticket = await this.ticketRepo.create({ ...data, assigneeId });
    await this.notificationService.notifyTicketCreated(ticket);
    return ticket;
  }

  async getTicketById(id: string, tenantId: string) {
    // Lấy ticket + comments
    const ticket = await this.ticketRepo.findById(id, tenantId);
    if (!ticket) return null;
    const comments = await this.prisma.ticketComment.findMany({ where: { ticketId: id } });
    return { ...ticket, comments };
  }

  async listTickets(params: { tenantId: string; status?: string; priority?: string; page?: number; limit?: number }) {
    return this.ticketRepo.findMany(params);
  }

  async updateTicket(id: string, data: Partial<Prisma.TicketUncheckedCreateInput>) {
    const ticket = await this.ticketRepo.update(id, data);
    if (data.status || data.assigneeId) {
      await this.notificationService.notifyTicketUpdated(ticket);
    }
    return ticket;
  }

  async deleteTicket(id: string) {
    return this.ticketRepo.softDelete(id);
  }
} 