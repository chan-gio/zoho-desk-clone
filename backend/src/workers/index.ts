import { logger } from '../shared/utils/logger.js';
import { emailWorker } from './email.worker.js';
import { aiWorker } from './ai.worker.js';
import { slaWorker } from './sla.worker.js';

export function startWorkers() {
  try {
    logger.info('Starting background workers...');
    
    // Start email worker
    emailWorker.start();
    
    // Start AI worker
    aiWorker.start();
    
    // Start SLA worker
    slaWorker.start();
    
    logger.info('All background workers started successfully');
  } catch (error) {
    logger.error('Failed to start workers:', error);
  }
}
