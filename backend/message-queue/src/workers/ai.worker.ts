import { Queue, Worker, Job } from 'bullmq';
import redis from '../config/redis';
import axios from 'axios';

const AI_QUEUE = 'ai_jobs';
export const aiQueue = new Queue(AI_QUEUE, { connection: redis });

/**
 * Worker xử lý AI tasks với Ollama (chạy local, miễn phí)
 * Mặc định sử dụng model 'mistral' cho phân tích/gán nhãn ticket
 */
export const aiWorker = new Worker(
  AI_QUEUE,
  async (job: Job) => {
    const { prompt, model, resultKey } = job.data;
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const ollamaModel = model || process.env.OLLAMA_MODEL || 'mistral';

    try {
      // Gọi Ollama API (local)
      const response = await axios.post(
        `${baseUrl}/api/generate`,
        {
          model: ollamaModel,
          prompt,
          stream: false
        },
        { timeout: 180000 } 
      );

      // Lưu kết quả vào Redis (nếu có resultKey)
      if (resultKey) {
        await redis.set(resultKey, JSON.stringify(response.data), 'EX', 3600); // TTL 1h
      }
      console.log('Ollama result:', response.data);
      return response.data;
    } catch (err: any) {
      console.error('Ollama API error:', err?.response?.data || err.message);
      throw err;
    }
  },
  { connection: redis }
); 