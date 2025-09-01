import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { AnalyticsService } from '../services/analytics.service';
import { ReportService } from '../services/report.service';
import { DashboardService } from '../services/dashboard.service';

// Load proto file
const PROTO_PATH = path.join(__dirname, 'analytics.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const analyticsProto = protoDescriptor.analytics as any;

// Initialize services
const analyticsService = new AnalyticsService();
const reportService = new ReportService();
const dashboardService = new DashboardService();

// Analytics Service Implementation
const analyticsServiceImplementation = {
  getTicketStats: async (call: any, callback: any) => {
    try {
      const { tenantId, dateFrom, dateTo, departmentId } = call.request;
      const stats = await analyticsService.getTicketStats(tenantId, dateFrom, dateTo, departmentId);
      callback(null, { stats });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getSLACompliance: async (call: any, callback: any) => {
    try {
      const { tenantId, dateFrom, dateTo } = call.request;
      const compliance = await analyticsService.getSLACompliance(tenantId, dateFrom, dateTo);
      callback(null, { compliance });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getAgentPerformance: async (call: any, callback: any) => {
    try {
      const { tenantId, agentId, dateFrom, dateTo } = call.request;
      const agents = await analyticsService.getAgentPerformance(tenantId, agentId, dateFrom, dateTo);
      callback(null, { agents });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  exportAnalyticsReport: async (call: any, callback: any) => {
    try {
      const { type, tenantId, dateFrom, dateTo, filters } = call.request;
      const result = await analyticsService.exportAnalyticsReport(type, tenantId, dateFrom, dateTo, filters);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Report Service Implementation
const reportServiceImplementation = {
  getTicketCount: async (call: any, callback: any) => {
    try {
      const { tenantId, dateFrom, dateTo, status } = call.request;
      const count = await reportService.getTicketCount(tenantId, dateFrom, dateTo, status);
      callback(null, { count });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getAvgSLAResponseTime: async (call: any, callback: any) => {
    try {
      const { tenantId, dateFrom, dateTo } = call.request;
      const responseTime = await reportService.getAvgSLAResponseTime(tenantId, dateFrom, dateTo);
      callback(null, { responseTime });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getAgentPerformanceReport: async (call: any, callback: any) => {
    try {
      const { tenantId, agentId, dateFrom, dateTo } = call.request;
      const report = await reportService.getAgentPerformanceReport(tenantId, agentId, dateFrom, dateTo);
      callback(null, { report });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  generateCustomReport: async (call: any, callback: any) => {
    try {
      const { name, type, metrics, filters, tenantId, dateFrom, dateTo } = call.request;
      const report = await reportService.generateCustomReport({
        name,
        type,
        metrics,
        filters,
        tenantId,
        dateFrom,
        dateTo
      });
      callback(null, { report });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Dashboard Service Implementation
const dashboardServiceImplementation = {
  getTicketTrends: async (call: any, callback: any) => {
    try {
      const { tenantId, period, days } = call.request;
      const trends = await dashboardService.getTicketTrends(tenantId, period, days);
      callback(null, { trends });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getSLAComplianceDashboard: async (call: any, callback: any) => {
    try {
      const { tenantId, period, days } = call.request;
      const dashboard = await dashboardService.getSLAComplianceDashboard(tenantId, period, days);
      callback(null, { dashboard });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getAgentStats: async (call: any, callback: any) => {
    try {
      const { tenantId, period, limit } = call.request;
      const stats = await dashboardService.getAgentStats(tenantId, period, limit);
      callback(null, { stats });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getDashboardOverview: async (call: any, callback: any) => {
    try {
      const { tenantId, period } = call.request;
      const overview = await dashboardService.getDashboardOverview(tenantId, period);
      callback(null, { overview });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Create gRPC server
export function createGrpcServer(): grpc.Server {
  const server = new grpc.Server();

  // Add services to server
  server.addService(analyticsProto.AnalyticsService.service, analyticsServiceImplementation);
  server.addService(analyticsProto.ReportService.service, reportServiceImplementation);
  server.addService(analyticsProto.DashboardService.service, dashboardServiceImplementation);

  return server;
}

// Start gRPC server
export function startGrpcServer(port: number = 50055): grpc.Server {
  const server = createGrpcServer();
  
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Failed to start gRPC server:', err);
        return;
      }
      
      server.start();
      console.log(`gRPC server running on port ${port}`);
    }
  );

  return server;
} 