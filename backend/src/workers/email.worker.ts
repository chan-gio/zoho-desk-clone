import Bull from 'bull';
import { logger } from '../shared/utils/logger.js';

const emailQueue = new Bull('email queue', process.env.REDIS_URL || 'redis://localhost:6379');

export const emailWorker = {
  start() {
    // Process email jobs
    emailQueue.process('send-email', async (job) => {
      const { to, subject, body, templateId } = job.data;
      
      try {
        logger.info(`Processing email job: ${job.id}`);
        
        // Mock email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        logger.info(`Email sent to ${to}: ${subject}`);
        
        return { success: true, messageId: `email_${Date.now()}` };
      } catch (error) {
        logger.error('Email job failed:', error);
        throw error;
      }
    });

    // Process notification jobs
    emailQueue.process('send-notification', async (job) => {
      const { userId, type, data } = job.data;
      
      try {
        logger.info(`Processing notification job: ${job.id}`);
        
        // Mock notification sending
        await new Promise(resolve => setTimeout(resolve, 500));
        
        logger.info(`Notification sent to user ${userId}: ${type}`);
        
        return { success: true, notificationId: `notif_${Date.now()}` };
      } catch (error) {
        logger.error('Notification job failed:', error);
        throw error;
      }
    });

    // Handle job events
    emailQueue.on('completed', (job, result) => {
      logger.info(`Email job ${job.id} completed:`, result);
    });

    emailQueue.on('failed', (job, err) => {
      logger.error(`Email job ${job.id} failed:`, err);
    });

    logger.info('Email worker started');
  },

  async addEmailJob(data: any) {
    return await emailQueue.add('send-email', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  },

  async addNotificationJob(data: any) {
    return await emailQueue.add('send-notification', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }
};
