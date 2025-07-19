import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

/**
 * Singleton Redis client for Bull/Agenda
 * BullMQ yêu cầu maxRetriesPerRequest = null
 */
const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

export default redis;