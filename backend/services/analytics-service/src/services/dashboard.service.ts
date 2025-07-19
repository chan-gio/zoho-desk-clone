import { MetricsModel } from '../models/metrics.model';

/**
 * Service for dashboard analytics widgets (ticket trends, SLAs, agent stats) using MongoDB (Mongoose).
 */
export class DashboardService {
  /**
   * Get ticket trend data for a tenant (last 30 days).
   */
  async getTicketTrends(tenantId: string): Promise<any[]> {
    return MetricsModel.find({ tenantId, type: 'ticket_count' })
      .sort({ recordedAt: -1 })
      .limit(30);
  }

  /**
   * Get SLA compliance data for a tenant.
   */
  async getSLACompliance(tenantId: string): Promise<any[]> {
    return MetricsModel.find({ tenantId, type: 'sla_compliance' });
  }

  /**
   * Get agent statistics for a tenant.
   */
  async getAgentStats(tenantId: string): Promise<any[]> {
    return MetricsModel.find({ tenantId, type: 'agent_stats' });
  }
} 