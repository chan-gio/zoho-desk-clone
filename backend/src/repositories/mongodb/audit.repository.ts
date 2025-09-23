import { AuditLog, IAuditLog } from '../../models/mongodb/audit.schema.js';
import { CreateAuditLogInput, AuditLogFilter } from '../../models/mongodb/types.js';

export class AuditRepository {
  async create(data: CreateAuditLogInput): Promise<IAuditLog> {
    const auditLog = new AuditLog(data);
    return await auditLog.save();
  }

  async findById(id: string): Promise<IAuditLog | null> {
    return await AuditLog.findById(id).exec();
  }

  async findMany(filter: AuditLogFilter): Promise<IAuditLog[]> {
    const query: any = {
      tenantId: filter.tenantId
    };

    if (filter.action) {
      query.action = filter.action;
    }

    if (filter.resource) {
      query.resource = filter.resource;
    }

    if (filter.userId) {
      query.userId = filter.userId;
    }

    if (filter.resourceId) {
      query.resourceId = filter.resourceId;
    }

    if (filter.severity) {
      query.severity = filter.severity;
    }

    if (filter.dateFrom || filter.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    return await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .skip((filter.page - 1) * filter.limit)
      .limit(filter.limit)
      .exec();
  }

  async count(filter: AuditLogFilter): Promise<number> {
    const query: any = {
      tenantId: filter.tenantId
    };

    if (filter.action) {
      query.action = filter.action;
    }

    if (filter.resource) {
      query.resource = filter.resource;
    }

    if (filter.userId) {
      query.userId = filter.userId;
    }

    if (filter.resourceId) {
      query.resourceId = filter.resourceId;
    }

    if (filter.severity) {
      query.severity = filter.severity;
    }

    if (filter.dateFrom || filter.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    return await AuditLog.countDocuments(query).exec();
  }

  async findByUser(userId: string, tenantId: string, limit: number = 100): Promise<IAuditLog[]> {
    return await AuditLog.find({
      userId,
      tenantId
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findByResource(resource: string, resourceId: string, tenantId: string): Promise<IAuditLog[]> {
    return await AuditLog.find({
      resource,
      resourceId,
      tenantId
    })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAuditSummary(tenantId: string, dateFrom?: Date, dateTo?: Date): Promise<{
    total: number;
    byAction: Record<string, number>;
    byResource: Record<string, number>;
    bySeverity: Record<string, number>;
    byUser: Record<string, number>;
  }> {
    const query: any = { tenantId };
    
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) {
        query.createdAt.$gte = dateFrom;
      }
      if (dateTo) {
        query.createdAt.$lte = dateTo;
      }
    }

    const [total, byAction, byResource, bySeverity, byUser] = await Promise.all([
      AuditLog.countDocuments(query).exec(),
      AuditLog.aggregate([
        { $match: query },
        { $group: { _id: '$action', count: { $sum: 1 } } }
      ]).exec(),
      AuditLog.aggregate([
        { $match: query },
        { $group: { _id: '$resource', count: { $sum: 1 } } }
      ]).exec(),
      AuditLog.aggregate([
        { $match: query },
        { $group: { _id: '$severity', count: { $sum: 1 } } }
      ]).exec(),
      AuditLog.aggregate([
        { $match: query },
        { $group: { _id: '$userId', count: { $sum: 1 } } }
      ]).exec()
    ]);

    return {
      total,
      byAction: byAction.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byResource: byResource.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      bySeverity: bySeverity.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byUser: byUser.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };
  }

  async exportAuditLogs(filter: AuditLogFilter, format: 'json' | 'csv' = 'json'): Promise<any> {
    const logs = await this.findMany(filter);
    
    if (format === 'json') {
      return logs;
    }
    
    // For CSV export, you would typically use a library like json2csv
    // This is a simplified version
    const csvData = logs.map(log => ({
      id: log._id,
      action: log.action,
      resource: log.resource,
      resourceId: log.resourceId,
      userId: log.userId,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      severity: log.severity,
      createdAt: log.createdAt
    }));
    
    return csvData;
  }

  async cleanupOldLogs(olderThanDays: number = 365): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    const result = await AuditLog.deleteMany({
      createdAt: { $lt: cutoffDate }
    }).exec();
    
    return result.deletedCount;
  }
}
