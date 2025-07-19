import { Queue, Worker, Job } from 'bullmq';
import redis from '../config/redis';
import { emailQueue } from './email.worker';

const SLA_QUEUE = 'sla_jobs';
export const slaQueue = new Queue(SLA_QUEUE, { connection: redis });

/**
 * Worker xử lý SLA cho ticket
 * Nếu ticket sắp hết hạn, gửi email cảnh báo qua emailQueue
 */
export const slaWorker = new Worker(
  SLA_QUEUE,
  async (job: Job) => {
    const { ticketId, ticketTitle, deadline, userEmail } = job.data;
    const now = Date.now();
    const deadlineTime = new Date(deadline).getTime();
    const timeLeft = deadlineTime - now;

    // Nếu còn dưới 1h thì gửi cảnh báo
    if (timeLeft > 0 && timeLeft < 3600_000) {
      await emailQueue.add('sla-warning', {
        to: userEmail,
        subject: `Cảnh báo SLA: Ticket sắp hết hạn` ,
        text: `Ticket "${ticketTitle}" (ID: ${ticketId}) sẽ hết hạn sau ${Math.round(timeLeft/60000)} phút.`
      });
      console.log(`SLA warning email queued for ticket ${ticketId}`);
    } else {
      console.log(`Ticket ${ticketId} SLA OK, time left: ${Math.round(timeLeft/60000)} phút.`);
    }
  },
  { connection: redis }
); 