import Bull from 'bull';
import { logger } from '../shared/utils/logger.js';

const aiQueue = new Bull('ai queue', process.env.REDIS_URL || 'redis://localhost:6379');

export const aiWorker = {
  start() {
    // Process AI analysis jobs
    aiQueue.process('analyze-ticket', async (job) => {
      const { ticketId, content } = job.data;
      
      try {
        logger.info(`Processing AI analysis job for ticket: ${ticketId}`);
        
        // Mock AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const analysis = {
          sentiment: 'neutral',
          category: 'general',
          priority: 'medium',
          suggestedTags: ['support', 'general'],
          confidence: 0.85
        };
        
        logger.info(`AI analysis completed for ticket ${ticketId}:`, analysis);
        
        return analysis;
      } catch (error) {
        logger.error('AI analysis job failed:', error);
        throw error;
      }
    });

    // Process knowledge base search jobs
    aiQueue.process('search-knowledge', async (job) => {
      const { query, context } = job.data;
      
      try {
        logger.info(`Processing knowledge search job: ${query}`);
        
        // Mock knowledge search
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const results = [
          {
            id: 'kb_1',
            title: 'How to reset password',
            relevance: 0.92,
            excerpt: 'To reset your password, go to...'
          },
          {
            id: 'kb_2',
            title: 'Account activation process',
            relevance: 0.78,
            excerpt: 'Account activation requires...'
          }
        ];
        
        logger.info(`Knowledge search completed for: ${query}`);
        
        return results;
      } catch (error) {
        logger.error('Knowledge search job failed:', error);
        throw error;
      }
    });

    // Handle job events
    aiQueue.on('completed', (job, result) => {
      logger.info(`AI job ${job.id} completed:`, result);
    });

    aiQueue.on('failed', (job, err) => {
      logger.error(`AI job ${job.id} failed:`, err);
    });

    logger.info('AI worker started');
  },

  async addAnalysisJob(data: any) {
    return await aiQueue.add('analyze-ticket', data, {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  },

  async addKnowledgeSearchJob(data: any) {
    return await aiQueue.add('search-knowledge', data, {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    });
  }
};
