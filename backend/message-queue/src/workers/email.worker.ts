import { Queue, Worker, Job } from 'bullmq';
import redis from '../config/redis';
import axios from 'axios';

const EMAIL_QUEUE = 'email_jobs';
export const emailQueue = new Queue(EMAIL_QUEUE, { connection: redis });

/**
 * Worker gửi email (Resend)
 */
export const emailWorker = new Worker(
  EMAIL_QUEUE,
  async (job: Job) => {
    const { to, subject, text, html } = job.data;
    const from = process.env.EMAIL_FROM || 'helpdesk@example.com';
    try {
      const response = await axios.post(
        'https://api.resend.com/emails',
        { from, to, subject, text, html },
        {
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Email sent via Resend:', to, subject, response.data);
      return;
    } catch (err: any) {
      console.error('Resend API error:', err?.response?.data || err.message);
      throw err;
    }
  },
  { connection: redis }
); 