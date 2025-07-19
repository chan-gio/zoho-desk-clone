import cron from 'node-cron';
import axios from 'axios';
import { MetricsModel } from '../models/metrics.model';

const TICKETING_SERVICE_URL = process.env.TICKETING_SERVICE_URL || 'http://localhost:3000';

async function collectAndStoreMetrics() {
  try {
    // Lấy danh sách tenant (ở đây giả lập, thực tế nên lấy từ DB hoặc service tenant)
    const tenants = process.env.TENANT_IDS ? process.env.TENANT_IDS.split(',') : ['default'];
    for (const tenantId of tenants) {
      // 1. Tổng hợp ticket_count và avg_resolution_time
      const { data: ticketsData } = await axios.get(`${TICKETING_SERVICE_URL}/tickets`, {
        params: { tenantId, limit: 10000 },
        headers: { 'x-tenant-id': tenantId }
      });
      const tickets = ticketsData.data || ticketsData;
      const ticketCount = tickets.length;
      const resolutionTimes = tickets
        .filter((t: any) => t.closedAt && t.createdAt)
        .map((t: any) => new Date(t.closedAt).getTime() - new Date(t.createdAt).getTime());
      const avgResolutionTime = resolutionTimes.length
        ? Math.round(resolutionTimes.reduce((a: number, b: number) => a + b, 0) / resolutionTimes.length / 1000)
        : null;
      await MetricsModel.create({
        tenantId,
        type: 'ticket_count',
        value: ticketCount,
        recordedAt: new Date()
      });
      if (avgResolutionTime !== null) {
        await MetricsModel.create({
          tenantId,
          type: 'avg_resolution_time',
          value: avgResolutionTime,
          recordedAt: new Date()
        });
      }
      // 2. Agent performance
      const agentStats: Record<string, { tickets: number; totalRating: number; countRating: number; }> = {};
      for (const t of tickets) {
        if (t.assigneeId) {
          if (!agentStats[t.assigneeId]) agentStats[t.assigneeId] = { tickets: 0, totalRating: 0, countRating: 0 };
          agentStats[t.assigneeId].tickets++;
          if (typeof t.rating === 'number') {
            agentStats[t.assigneeId].totalRating += t.rating;
            agentStats[t.assigneeId].countRating++;
          }
        }
      }
      for (const agentId in agentStats) {
        const stats = agentStats[agentId];
        await MetricsModel.create({
          tenantId,
          type: 'agent_performance',
          value: stats.tickets,
          recordedAt: new Date(),
          // Có thể mở rộng thêm trường agentId, avgRating nếu cần
        });
      }
      // 3. SLA compliance (giả lập: breach nếu closedAt - createdAt > 24h)
      const breaches = tickets.filter((t: any) => t.closedAt && t.createdAt && (new Date(t.closedAt).getTime() - new Date(t.createdAt).getTime()) > 86400000);
      await MetricsModel.create({
        tenantId,
        type: 'sla_breach_count',
        value: breaches.length,
        recordedAt: new Date()
      });
    }
    console.log('Metrics collected and stored');
  } catch (err) {
    const error = err as Error;
    console.error('Metrics worker error:', error.message);
  }
}

// Chạy mỗi giờ
cron.schedule('0 * * * *', collectAndStoreMetrics);

// Nếu muốn chạy ngay khi start
collectAndStoreMetrics(); 