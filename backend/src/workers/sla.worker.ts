import Bull from 'bull';
import { logger } from '../shared/utils/logger.js';
import { getPrismaClient } from '../database/postgres.js';

const slaQueue = new Bull('sla queue', process.env.REDIS_URL || 'redis://localhost:6379');

export const slaWorker = {
  start() {
    // Process SLA monitoring jobs
    slaQueue.process('check-sla', async (job) => {
      try {
        logger.info('Processing SLA check job');
        
        const prisma = getPrismaClient();
        
        // Get tickets that might be breaching SLA
        const tickets = await prisma.ticket.findMany({
          where: {
            status: {
              in: ['open', 'in_progress']
            },
            createdAt: {
              lte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
            }
          },
          include: {
            assignee: true,
            priority: { select: { id: true, name: true, color: true } }
          }
        });
        
        const slaBreaches = [];
        
        for (const ticket of tickets) {
          const hoursSinceCreation = (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60);
          
          // Check if ticket is breaching SLA (24 hours for high priority, 48 hours for others)
          const slaThreshold = ticket.priority?.name === 'high' ? 24 : 48;
          
          if (hoursSinceCreation > slaThreshold) {
            slaBreaches.push({
              ticketId: ticket.id,
              title: ticket.title,
              priority: ticket.priority?.name || 'medium',
              hoursSinceCreation: Math.round(hoursSinceCreation),
              assigneeId: ticket.assigneeId
            });
          }
        }
        
        logger.info(`Found ${slaBreaches.length} SLA breaches`);
        
        // Send notifications for SLA breaches
        for (const breach of slaBreaches) {
          await this.sendSLANotification(breach);
        }
        
        return { breaches: slaBreaches.length };
      } catch (error) {
        logger.error('SLA check job failed:', error);
        throw error;
      }
    });

    // Process escalation jobs
    slaQueue.process('escalate-ticket', async (job) => {
      const { ticketId, reason } = job.data;
      
      try {
        logger.info(`Processing escalation job for ticket: ${ticketId}`);
        
        const prisma = getPrismaClient();
        
        // Escalate ticket
        const ticket = await prisma.ticket.update({
          where: { id: ticketId },
          data: {
            status: 'escalated'
          }
        });
        
        logger.info(`Ticket ${ticketId} escalated: ${reason}`);
        
        return { success: true, ticketId };
      } catch (error) {
        logger.error('Escalation job failed:', error);
        throw error;
      }
    });

    // Schedule regular SLA checks (every hour)
    slaQueue.add('check-sla', {}, {
      repeat: { cron: '0 * * * *' }, // Every hour
      removeOnComplete: 10,
      removeOnFail: 5
    });

    // Handle job events
    slaQueue.on('completed', (job, result) => {
      logger.info(`SLA job ${job.id} completed:`, result);
    });

    slaQueue.on('failed', (job, err) => {
      logger.error(`SLA job ${job.id} failed:`, err);
    });

    logger.info('SLA worker started');
  },

  async addEscalationJob(data: any) {
    return await slaQueue.add('escalate-ticket', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
    });
  },

  async sendSLANotification(breach: any) {
    // Mock SLA notification
    logger.warn(`SLA BREACH: Ticket ${breach.ticketId} (${breach.title}) has been open for ${breach.hoursSinceCreation} hours`);
    
    // In a real implementation, you would:
    // 1. Send email to assignee and manager
    // 2. Create a notification in the system
    // 3. Update ticket status
    // 4. Log the breach for reporting
  }
};
