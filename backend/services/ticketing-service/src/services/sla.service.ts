import { NotificationService } from './notification.service';
import { PrismaClient } from '../../../../shared/prisma/generated/client';

export class SLAService {
  constructor(private prisma: PrismaClient, private notificationService: NotificationService) {}

  // Kiểm tra SLA cho 1 ticket, nếu breach thì gửi notification
  async monitorSLA(ticketId: string) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) return;
    // Giả lập: nếu ticket quá hạn (createdAt + SLA < now)
    const sla = await this.prisma.sLA.findFirst({ where: { tenantId: ticket.tenantId } });
    if (!sla) return;
    const deadline = new Date(ticket.createdAt);
    deadline.setHours(deadline.getHours() + sla.responseTime);
    if (new Date() > deadline && ticket.status !== 'closed') {
      await this.notificationService.notifySlaBreached(ticket);
    }
  }

  // Worker: kiểm tra tất cả ticket chưa closed, gọi monitorSLA
  async monitorAllOpenTickets() {
    const openTickets = await this.prisma.ticket.findMany({ where: { status: { not: 'closed' } } });
    for (const ticket of openTickets) {
      await this.monitorSLA(ticket.id);
    }
  }
} 