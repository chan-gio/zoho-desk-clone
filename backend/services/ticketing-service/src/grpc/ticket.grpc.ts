import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { TicketService } from '../services/ticket.service';
import { CommentService } from '../services/comment.service';
import { DepartmentService } from '../services/department.service';
import { WorkflowService } from '../services/workflow.service';

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

// Initialize services
const ticketService = new TicketService();
const commentService = new CommentService();
const departmentService = new DepartmentService();
const workflowService = new WorkflowService();

// Ticket Service Implementation
const ticketServiceImplementation = {
  getTicket: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const ticket = await ticketService.getTicketById(id, tenantId);
      
      if (!ticket) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Ticket not found'
        });
      }

      callback(null, { ticket });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createTicket: async (call: any, callback: any) => {
    try {
      const ticketData = call.request;
      const ticket = await ticketService.createTicket(ticketData);
      callback(null, { ticket });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateTicket: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const ticket = await ticketService.updateTicket(id, updateData);
      callback(null, { ticket });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteTicket: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await ticketService.deleteTicket(id, tenantId);
      callback(null, { success: true, message: 'Ticket deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listTickets: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await ticketService.listTickets(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  assignTicket: async (call: any, callback: any) => {
    try {
      const { ticketId, assigneeId, tenantId } = call.request;
      const ticket = await ticketService.updateTicket(ticketId, { assigneeId });
      callback(null, { ticket });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  changeStatus: async (call: any, callback: any) => {
    try {
      const { ticketId, status, tenantId } = call.request;
      const ticket = await ticketService.updateTicket(ticketId, { status });
      callback(null, { ticket });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Comment Service Implementation
const commentServiceImplementation = {
  getComment: async (call: any, callback: any) => {
    try {
      const { id } = call.request;
      const comment = await commentService.getCommentById(id);
      
      if (!comment) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Comment not found'
        });
      }

      callback(null, { comment });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createComment: async (call: any, callback: any) => {
    try {
      const commentData = call.request;
      const comment = await commentService.addComment(commentData);
      callback(null, { comment });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateComment: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const comment = await commentService.updateComment(id, updateData);
      callback(null, { comment });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteComment: async (call: any, callback: any) => {
    try {
      const { id } = call.request;
      await commentService.deleteComment(id);
      callback(null, { success: true, message: 'Comment deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listComments: async (call: any, callback: any) => {
    try {
      const { ticketId, page, limit } = call.request;
      const result = await commentService.getCommentsByTicket(ticketId, page, limit);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Department Service Implementation
const departmentServiceImplementation = {
  getDepartment: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const department = await departmentService.getDepartmentById(id, tenantId);
      
      if (!department) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Department not found'
        });
      }

      callback(null, { department });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createDepartment: async (call: any, callback: any) => {
    try {
      const departmentData = call.request;
      const department = await departmentService.createDepartment(departmentData);
      callback(null, { department });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateDepartment: async (call: any, callback: any) => {
    try {
      const { id, tenantId, ...updateData } = call.request;
      const department = await departmentService.updateDepartment(id, tenantId, updateData);
      callback(null, { department });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteDepartment: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await departmentService.deleteDepartment(id, tenantId);
      callback(null, { success: true, message: 'Department deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listDepartments: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await departmentService.listDepartments(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Workflow Service Implementation
const workflowServiceImplementation = {
  getWorkflow: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const workflow = await workflowService.getWorkflowById(id, tenantId);
      
      if (!workflow) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Workflow not found'
        });
      }

      callback(null, { workflow });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createWorkflow: async (call: any, callback: any) => {
    try {
      const workflowData = call.request;
      const workflow = await workflowService.createWorkflow(workflowData);
      callback(null, { workflow });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateWorkflow: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const workflow = await workflowService.updateWorkflow(id, updateData);
      callback(null, { workflow });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteWorkflow: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await workflowService.deleteWorkflow(id, tenantId);
      callback(null, { success: true, message: 'Workflow deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listWorkflows: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await workflowService.listWorkflows(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  executeWorkflow: async (call: any, callback: any) => {
    try {
      const { workflowId, ticketId, tenantId } = call.request;
      const result = await workflowService.executeWorkflow(workflowId, ticketId, tenantId);
      callback(null, { success: true, message: 'Workflow executed successfully', result });
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
  server.addService(ticketingProto.TicketService.service, ticketServiceImplementation);
  server.addService(ticketingProto.CommentService.service, commentServiceImplementation);
  server.addService(ticketingProto.DepartmentService.service, departmentServiceImplementation);
  server.addService(ticketingProto.WorkflowService.service, workflowServiceImplementation);

  return server;
}

// Start gRPC server
export function startGrpcServer(port: number = 50052): grpc.Server {
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