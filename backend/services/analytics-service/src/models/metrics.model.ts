import mongoose, { Schema, Document } from 'mongoose';

/**
 * @typedef Metrics
 * @property {string} tenantId - Tenant identifier for multi-tenancy
 * @property {string} type - Metric type (e.g., 'ticket_count', 'avg_response_time')
 * @property {number} value - Metric value
 * @property {Date} recordedAt - Timestamp when metric was recorded
 */
export interface IMetrics extends Document {
  tenantId: string;
  type: string;
  value: number;
  recordedAt: Date;
}

const MetricsSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const MetricsModel = mongoose.model<IMetrics>('Metrics', MetricsSchema); 