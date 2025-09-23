import { Resend } from 'resend';
import twilio from 'twilio';
import { Server as SocketIOServer } from 'socket.io';

export class NotificationService {
  private resend: Resend;
  private io?: SocketIOServer | undefined;

  constructor(io?: SocketIOServer) {
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    } else {
      throw new Error('RESEND_API_KEY is not set');
    }
    this.io = io;
  }

  private emitSocketEvent(event: string, payload: any) {
    if (this.io) {
      this.io.emit(event, payload);
    } else {
      // fallback log nếu chưa có io instance
      console.log(`[WebSocket] Event: ${event}`, payload);
    }
  }

  async notifyTicketCreated(ticket: any) {
    if (ticket.assigneeEmail) {
      await this.sendEmail(ticket.assigneeEmail, 'New Ticket Assigned', `Ticket: ${ticket.title}`);
    }
    this.emitSocketEvent('ticket_created', ticket);
    return true;
  }

  async notifyTicketUpdated(ticket: any) {
    if (ticket.assigneeEmail) {
      await this.sendEmail(ticket.assigneeEmail, 'Ticket Updated', `Ticket: ${ticket.title}`);
    }
    this.emitSocketEvent('ticket_updated', ticket);
    return true;
  }

  async notifySlaBreached(ticket: any) {
    if (ticket.assigneePhone) {
      await this.sendSMS(ticket.assigneePhone, `SLA breached for ticket: ${ticket.title}`);
    }
    this.emitSocketEvent('sla_breached', ticket);
    return true;
  }

  async notifyNewComment(ticket: any, comment: any) {
    if (ticket.assigneeEmail) {
      await this.sendEmail(ticket.assigneeEmail, 'New Comment on Ticket', comment.comment);
    }
    this.emitSocketEvent('new_comment', { ticket, comment });
    return true;
  }

  async sendEmail(to: string, subject: string, text: string) {
    if (!this.resend) return false;
    await this.resend.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@example.com',
      to,
      subject,
      text,
    });
    return true;
  }

  async sendSMS(to: string, body: string) {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_FROM) return false;
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body,
      from: process.env.TWILIO_FROM,
      to,
    });
    return true;
  }

  // Methods for controller
  async getNotifications(tenantId: string, userId?: string, page = 1, limit = 10) {
    // Implementation for getting notifications
    return { notifications: [], total: 0, page, limit };
  }

  async getNotificationById(id: string, tenantId: string) {
    // Implementation for getting notification by ID
    return null;
  }

  async markAsRead(id: string, tenantId: string) {
    // Implementation for marking notification as read
    return true;
  }

  async markAllAsRead(userId: string, tenantId: string) {
    // Implementation for marking all notifications as read
    return 0;
  }

  async deleteNotification(id: string, tenantId: string) {
    // Implementation for deleting notification
    return true;
  }

  async getNotificationTemplates(tenantId: string, page = 1, limit = 10) {
    // Implementation for getting notification templates
    return { templates: [], total: 0, page, limit };
  }

  async createNotificationTemplate(data: any, tenantId: string) {
    // Implementation for creating notification template
    return { id: 'template-id', ...data };
  }

  async updateNotificationTemplate(id: string, data: any, tenantId: string) {
    // Implementation for updating notification template
    return { id, ...data };
  }

  async deleteNotificationTemplate(id: string, tenantId: string) {
    // Implementation for deleting notification template
    return true;
  }
}
