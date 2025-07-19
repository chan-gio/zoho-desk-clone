import { MetricsModel, IMetrics } from '../models/metrics.model';

/**
 * Service for recording and fetching raw metrics using MongoDB (Mongoose).
 */
export class MetricsService {
  /**
   * Record a new metric.
   */
  async recordMetric(metric: Partial<IMetrics>): Promise<IMetrics> {
    return MetricsModel.create(metric);
  }

  /**
   * Fetch metrics by type and tenant.
   */
  async getMetricsByType(tenantId: string, type: string): Promise<IMetrics[]> {
    return MetricsModel.find({ tenantId, type });
  }
} 