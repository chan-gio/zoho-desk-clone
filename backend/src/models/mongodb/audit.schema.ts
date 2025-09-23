import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  _id: string;
  tenantId: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  ipAddress: string;
  userAgent?: string;
  details?: Record<string, any>;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    maxlength: 50,
    index: true
  },
  resource: {
    type: String,
    required: true,
    maxlength: 50,
    index: true
  },
  resourceId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  ipAddress: {
    type: String,
    required: true,
    maxlength: 45
  },
  userAgent: {
    type: String
  },
  details: {
    type: Schema.Types.Mixed
  },
  oldValues: {
    type: Schema.Types.Mixed
  },
  newValues: {
    type: Schema.Types.Mixed
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  collection: 'audit_logs'
});

// Indexes
AuditLogSchema.index({ tenantId: 1, action: 1 });
AuditLogSchema.index({ tenantId: 1, resource: 1 });
AuditLogSchema.index({ tenantId: 1, userId: 1 });
AuditLogSchema.index({ tenantId: 1, createdAt: -1 });
AuditLogSchema.index({ createdAt: -1 });

// TTL index for automatic cleanup (keep logs for 1 year)
AuditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 31536000 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
