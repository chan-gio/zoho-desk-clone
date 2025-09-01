import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

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

export class AnalyticsGrpcClient {
  private analyticsService: any;
  private reportService: any;
  private dashboardService: any;

  constructor(serverAddress: string = 'localhost:50055') {
    this.analyticsService = new analyticsProto.AnalyticsService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.reportService = new analyticsProto.ReportService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.dashboardService = new analyticsProto.DashboardService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  // Analytics Service Methods
  async getTicketStats(tenantId: string, dateFrom: string, dateTo: string, departmentId?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.analyticsService.getTicketStats({ tenantId, dateFrom, dateTo, departmentId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getSLACompliance(tenantId: string, dateFrom: string, dateTo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.analyticsService.getSLACompliance({ tenantId, dateFrom, dateTo }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getAgentPerformance(tenantId: string, agentId?: string, dateFrom?: string, dateTo?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.analyticsService.getAgentPerformance({ tenantId, agentId, dateFrom, dateTo }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async exportAnalyticsReport(type: string, tenantId: string, dateFrom: string, dateTo: string, filters: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.analyticsService.exportAnalyticsReport({ type, tenantId, dateFrom, dateTo, filters }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Report Service Methods
  async getTicketCount(tenantId: string, dateFrom: string, dateTo: string, status?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.reportService.getTicketCount({ tenantId, dateFrom, dateTo, status }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getAvgSLAResponseTime(tenantId: string, dateFrom: string, dateTo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.reportService.getAvgSLAResponseTime({ tenantId, dateFrom, dateTo }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getAgentPerformanceReport(tenantId: string, agentId: string, dateFrom: string, dateTo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.reportService.getAgentPerformanceReport({ tenantId, agentId, dateFrom, dateTo }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async generateCustomReport(name: string, type: string, metrics: string[], filters: string[], tenantId: string, dateFrom: string, dateTo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.reportService.generateCustomReport({ name, type, metrics, filters, tenantId, dateFrom, dateTo }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Dashboard Service Methods
  async getTicketTrends(tenantId: string, period: string, days: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dashboardService.getTicketTrends({ tenantId, period, days }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getSLAComplianceDashboard(tenantId: string, period: string, days: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dashboardService.getSLAComplianceDashboard({ tenantId, period, days }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getAgentStats(tenantId: string, period: string, limit: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dashboardService.getAgentStats({ tenantId, period, limit }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getDashboardOverview(tenantId: string, period: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dashboardService.getDashboardOverview({ tenantId, period }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Close connections
  close(): void {
    this.analyticsService.close();
    this.reportService.close();
    this.dashboardService.close();
  }
}

// Export singleton instance
export const analyticsGrpcClient = new AnalyticsGrpcClient(); 