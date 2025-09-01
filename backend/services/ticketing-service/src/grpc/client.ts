import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load proto file
const PROTO_PATH = path.join(__dirname, 'ticket.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const ticketingProto = protoDescriptor.ticketing as any;

export class TicketingGrpcClient {
  private ticketService: any;
  private commentService: any;
  private departmentService: any;
  private workflowService: any;

  constructor(serverAddress: string = 'localhost:50052') {
    this.ticketService = new ticketingProto.TicketService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.commentService = new ticketingProto.CommentService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.departmentService = new ticketingProto.DepartmentService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.workflowService = new ticketingProto.WorkflowService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  // Ticket Service Methods
  async getTicket(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.getTicket({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createTicket(ticketData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.createTicket(ticketData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateTicket(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.updateTicket({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteTicket(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.deleteTicket({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listTickets(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.listTickets(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async assignTicket(ticketId: string, assigneeId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.assignTicket({ ticketId, assigneeId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async changeStatus(ticketId: string, status: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ticketService.changeStatus({ ticketId, status, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Comment Service Methods
  async getComment(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commentService.getComment({ id }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createComment(commentData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commentService.createComment(commentData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateComment(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commentService.updateComment({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteComment(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commentService.deleteComment({ id }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listComments(ticketId: string, page: number, limit: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commentService.listComments({ ticketId, page, limit }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Department Service Methods
  async getDepartment(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.departmentService.getDepartment({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createDepartment(departmentData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.departmentService.createDepartment(departmentData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateDepartment(id: string, tenantId: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.departmentService.updateDepartment({ id, tenantId, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteDepartment(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.departmentService.deleteDepartment({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listDepartments(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.departmentService.listDepartments(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Workflow Service Methods
  async getWorkflow(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.workflowService.getWorkflow({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createWorkflow(workflowData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.workflowService.createWorkflow(workflowData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateWorkflow(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.workflowService.updateWorkflow({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteWorkflow(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.workflowService.deleteWorkflow({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listWorkflows(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.workflowService.listWorkflows(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async executeWorkflow(workflowId: string, ticketId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.workflowService.executeWorkflow({ workflowId, ticketId, tenantId }, (error: any, response: any) => {
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
    this.ticketService.close();
    this.commentService.close();
    this.departmentService.close();
    this.workflowService.close();
  }
}

// Export singleton instance
export const ticketingGrpcClient = new TicketingGrpcClient(); 