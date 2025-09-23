import { getPrismaClient } from '../database/postgres.js';
import { AuditLog, IAuditLog } from '../models/mongodb/audit.schema.js';
import { Document } from 'mongoose';

type AuditLogDocument = Omit<IAuditLog, keyof Document> & { _id: string };
import { CreateAuditLogInput, AuditLogFilter } from '../models/mongodb/types.js';

interface AuditLogSummary {
  totalActions: number;
  actionsByType: Record<string, number>;
  actionsByResource: Record<string, number>;
  actionsByUser: Record<string, number>;
  actionsByDay: Record<string, number>;
  period: string;
}

export class AuditService {
  private get prisma() {
    return getPrismaClient();
  }

  async createAuditLog(data: CreateAuditLogInput): Promise<AuditLogDocument> {
    // In a real app, you would save this to an AuditLog table
    const auditLog: AuditLogDocument = {
      _id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      userId: data.userId,
      tenantId: data.tenantId,
      ipAddress: data.ipAddress,
      details: data.details || {},
      severity: 'medium',
      createdAt: new Date(),
      ...(data.userAgent && { userAgent: data.userAgent }),
      ...(data.oldValues && { oldValues: data.oldValues }),
      ...(data.newValues && { newValues: data.newValues })
    };

    // In a real app, save to database
    // await this.prisma.auditLog.create({ data: auditLog });

    return auditLog;
  }

  async getAuditLogById(id: string, tenantId: string): Promise<AuditLogDocument | null> {
    // In a real app, query from database
    // const auditLog = await this.prisma.auditLog.findFirst({
    //   where: { id, tenantId }
    // });
    // return auditLog;

    // Mock implementation
    return null;
  }

  async getAuditLogs(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    action?: string;
    resource?: string;
    userId?: string;
    resourceId?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<{ auditLogs: AuditLogDocument[]; total: number; page: number; limit: number }> {
    const { tenantId, page = 1, limit = 20, action, resource, userId, resourceId, dateFrom, dateTo } = params;
    const skip = (page - 1) * limit;

    // In a real app, query from database
    // const where: any = { tenantId };
    // if (action) where.action = action;
    // if (resource) where.resource = resource;
    // if (userId) where.userId = userId;
    // if (resourceId) where.resourceId = resourceId;
    // if (dateFrom) where.timestamp = { gte: dateFrom };
    // if (dateTo) where.timestamp = { lte: dateTo };

    // const [auditLogs, total] = await Promise.all([
    //   this.prisma.auditLog.findMany({
    //     where,
    //     skip,
    //     take: limit,
    //     orderBy: { timestamp: 'desc' }
    //   }),
    //   this.prisma.auditLog.count({ where })
    // ]);

    // Mock implementation
    const auditLogs: AuditLogDocument[] = [];
    const total = 0;

    return {
      auditLogs,
      total,
      page,
      limit
    };
  }

  async getAuditLogsByUser(params: {
    userId: string;
    tenantId: string;
    page?: number;
    limit?: number;
    action?: string;
    resource?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<{ auditLogs: AuditLogDocument[]; total: number; page: number; limit: number }> {
    return this.getAuditLogs({
      ...params,
      userId: params.userId
    });
  }

  async getAuditLogsByResource(params: {
    resource: string;
    resourceId: string;
    tenantId: string;
    page?: number;
    limit?: number;
    action?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<{ auditLogs: AuditLogDocument[]; total: number; page: number; limit: number }> {
    return this.getAuditLogs({
      ...params,
      resource: params.resource,
      resourceId: params.resourceId
    });
  }

  async getAuditSummary(params: {
    tenantId: string;
    period?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<AuditLogSummary> {
    const { tenantId, period = '30d', dateFrom, dateTo } = params;

    // In a real app, query from database
    // const where: any = { tenantId };
    // if (dateFrom) where.timestamp = { gte: dateFrom };
    // if (dateTo) where.timestamp = { lte: dateTo };

    // const auditLogs = await this.prisma.auditLog.findMany({ where });

    // Mock implementation
    const auditLogs: AuditLogDocument[] = [];

    const summary: AuditLogSummary = {
      totalActions: auditLogs.length,
      actionsByType: auditLogs.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      actionsByResource: auditLogs.reduce((acc, log) => {
        acc[log.resource] = (acc[log.resource] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      actionsByUser: auditLogs.reduce((acc, log) => {
        acc[log.userId] = (acc[log.userId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      actionsByDay: auditLogs.reduce((acc, log) => {
        const day = log.createdAt.toISOString().split('T')[0];
        acc[day || ''] = (acc[day || ''] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      period
    };

    return summary;
  }

  async exportAuditLogs(params: {
    tenantId: string;
    format?: string;
    action?: string;
    resource?: string;
    userId?: string;
    resourceId?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<{ data: string; filename: string }> {
    const { format = 'csv', tenantId } = params;
    
    // Get audit logs
    const { auditLogs } = await this.getAuditLogs({
      tenantId,
      page: 1,
      limit: 10000, // Export all
      ...(params.action && { action: params.action }),
      ...(params.resource && { resource: params.resource }),
      ...(params.userId && { userId: params.userId }),
      ...(params.resourceId && { resourceId: params.resourceId }),
      ...(params.dateFrom && { dateFrom: params.dateFrom }),
      ...(params.dateTo && { dateTo: params.dateTo })
    });

    if (format === 'csv') {
      const csv = this.convertToCSV(auditLogs);
      return { data: csv, filename: 'audit_logs.csv' };
    } else {
      return { data: JSON.stringify(auditLogs, null, 2), filename: 'audit_logs.json' };
    }
  }

  private convertToCSV(auditLogs: AuditLogDocument[]): string {
    if (auditLogs.length === 0) return '';

    const headers = [
      'ID',
      'Action',
      'Resource',
      'Resource ID',
      'User ID',
      'Tenant ID',
      'IP Address',
      'User Agent',
      'Timestamp',
      'Details',
      'Old Values',
      'New Values'
    ];

    const rows = auditLogs.map(log => [
      log._id,
      log.action,
      log.resource,
      log.resourceId,
      log.userId,
      log.tenantId,
      log.ipAddress || '',
      log.userAgent || '',
      log.createdAt.toISOString(),
      JSON.stringify(log.details),
      JSON.stringify(log.oldValues || {}),
      JSON.stringify(log.newValues || {})
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }

  // Helper method to log actions
  async logAction(params: {
    action: string;
    resource: string;
    resourceId: string;
    userId: string;
    tenantId: string;
    ipAddress?: string;
    userAgent?: string;
    details?: Record<string, any>;
    oldValues?: Record<string, any>;
    newValues?: Record<string, any>;
  }): Promise<void> {
    await this.createAuditLog({
      action: params.action as any,
      resource: params.resource as any,
      resourceId: params.resourceId,
      userId: params.userId,
      tenantId: params.tenantId,
      ipAddress: params.ipAddress || 'unknown',
      ...(params.userAgent && { userAgent: params.userAgent }),
      ...(params.details && { details: params.details }),
      ...(params.oldValues && { oldValues: params.oldValues }),
      ...(params.newValues && { newValues: params.newValues })
    });
  }
}
