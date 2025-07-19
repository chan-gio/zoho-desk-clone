import { MetricsModel } from '../models/metrics.model';

/**
 * Service for generating analytics reports (tickets, SLAs, agent performance) using MongoDB (Mongoose).
 */
export class ReportService {
  /**
   * Get ticket count report for a tenant.
   */
  async getTicketCount(tenantId: string): Promise<number> {
    const result = await MetricsModel.aggregate([
      { $match: { tenantId, type: 'ticket_count' } },
      { $group: { _id: null, total: { $sum: '$value' } } },
    ]);
    return result[0]?.total || 0;
  }

  /**
   * Get average SLA response time for a tenant.
   */
  async getAvgSLAResponseTime(tenantId: string): Promise<number> {
    const result = await MetricsModel.aggregate([
      { $match: { tenantId, type: 'sla_response_time' } },
      { $group: { _id: null, avg: { $avg: '$value' } } },
    ]);
    return result[0]?.avg || 0;
  }

  /**
   * Get agent performance metrics for a tenant.
   */
  async getAgentPerformance(tenantId: string): Promise<any[]> {
    return MetricsModel.find({ tenantId, type: 'agent_performance' });
  }
} 