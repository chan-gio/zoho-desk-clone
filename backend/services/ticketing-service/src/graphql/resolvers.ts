import { TicketService } from '../services/ticket.service';
import { CommentService } from '../services/comment.service';
import { DepartmentService } from '../services/department.service';
import { WorkflowService } from '../services/workflow.service';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

// Initialize services
const ticketService = new TicketService();
const commentService = new CommentService();
const departmentService = new DepartmentService();
const workflowService = new WorkflowService();

// Event names for subscriptions
const EVENTS = {
  TICKET_CREATED: 'TICKET_CREATED',
  TICKET_UPDATED: 'TICKET_UPDATED',
  TICKET_DELETED: 'TICKET_DELETED',
  TICKET_ASSIGNED: 'TICKET_ASSIGNED',
  TICKET_STATUS_CHANGED: 'TICKET_STATUS_CHANGED',
  COMMENT_CREATED: 'COMMENT_CREATED',
  COMMENT_UPDATED: 'COMMENT_UPDATED',
  COMMENT_DELETED: 'COMMENT_DELETED',
  DEPARTMENT_CREATED: 'DEPARTMENT_CREATED',
  DEPARTMENT_UPDATED: 'DEPARTMENT_UPDATED',
  DEPARTMENT_DELETED: 'DEPARTMENT_DELETED',
  WORKFLOW_CREATED: 'WORKFLOW_CREATED',
  WORKFLOW_UPDATED: 'WORKFLOW_UPDATED',
  WORKFLOW_DELETED: 'WORKFLOW_DELETED',
  WORKFLOW_EXECUTED: 'WORKFLOW_EXECUTED'
};

export const resolvers = {
  Query: {
    // Ticket Queries
    getTicket: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        return await ticketService.getTicketById(id, tenantId);
      } catch (error) {
        throw new Error(`Failed to get ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    listTickets: async (_: any, { input }: { input: any }) => {
      try {
        const { tickets, total, page, limit } = await ticketService.listTickets(input);
        return {
          tickets,
          total,
          page,
          limit
        };
      } catch (error) {
        throw new Error(`Failed to list tickets: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Comment Queries
    getComment: async (_: any, { id }: { id: string }) => {
      try {
        return await commentService.getCommentById(id);
      } catch (error) {
        throw new Error(`Failed to get comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    listComments: async (_: any, { input }: { input: any }) => {
      try {
        const { comments, total, page, limit } = await commentService.getCommentsByTicket(
          input.ticketId,
          input.page,
          input.limit
        );
        return {
          comments,
          total,
          page,
          limit
        };
      } catch (error) {
        throw new Error(`Failed to list comments: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Department Queries
    getDepartment: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        return await departmentService.getDepartmentById(id, tenantId);
      } catch (error) {
        throw new Error(`Failed to get department: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    listDepartments: async (_: any, { input }: { input: any }) => {
      try {
        const { departments, total, page, limit } = await departmentService.listDepartments(input);
        return {
          departments,
          total,
          page,
          limit
        };
      } catch (error) {
        throw new Error(`Failed to list departments: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Workflow Queries
    getWorkflow: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        return await workflowService.getWorkflowById(id, tenantId);
      } catch (error) {
        throw new Error(`Failed to get workflow: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    listWorkflows: async (_: any, { input }: { input: any }) => {
      try {
        const { workflows, total, page, limit } = await workflowService.listWorkflows(input);
        return {
          workflows,
          total,
          page,
          limit
        };
      } catch (error) {
        throw new Error(`Failed to list workflows: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },

  Mutation: {
    // Ticket Mutations
    createTicket: async (_: any, { input }: { input: any }) => {
      try {
        const ticket = await ticketService.createTicket(input);
        // Publish ticket created event
        pubsub.publish(EVENTS.TICKET_CREATED, {
          ticketCreated: ticket
        });
        return ticket;
      } catch (error) {
        throw new Error(`Failed to create ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    updateTicket: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const ticket = await ticketService.updateTicket(id, input);
        // Publish ticket updated event
        pubsub.publish(EVENTS.TICKET_UPDATED, {
          ticketUpdated: ticket
        });
        return ticket;
      } catch (error) {
        throw new Error(`Failed to update ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    deleteTicket: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        await ticketService.deleteTicket(id, tenantId);
        // Publish ticket deleted event
        pubsub.publish(EVENTS.TICKET_DELETED, {
          ticketDeleted: id
        });
        return {
          success: true,
          message: 'Ticket deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    assignTicket: async (_: any, { input }: { input: any }) => {
      try {
        const ticket = await ticketService.updateTicket(input.ticketId, { assigneeId: input.assigneeId });
        // Publish ticket assigned event
        pubsub.publish(EVENTS.TICKET_ASSIGNED, {
          ticketAssigned: ticket
        });
        return ticket;
      } catch (error) {
        throw new Error(`Failed to assign ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    changeStatus: async (_: any, { input }: { input: any }) => {
      try {
        const ticket = await ticketService.updateTicket(input.ticketId, { status: input.status });
        // Publish ticket status changed event
        pubsub.publish(EVENTS.TICKET_STATUS_CHANGED, {
          ticketStatusChanged: ticket
        });
        return ticket;
      } catch (error) {
        throw new Error(`Failed to change ticket status: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Comment Mutations
    createComment: async (_: any, { input }: { input: any }) => {
      try {
        const comment = await commentService.addComment(input);
        // Publish comment created event
        pubsub.publish(EVENTS.COMMENT_CREATED, {
          commentCreated: comment
        });
        return comment;
      } catch (error) {
        throw new Error(`Failed to create comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    updateComment: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const comment = await commentService.updateComment(id, input);
        // Publish comment updated event
        pubsub.publish(EVENTS.COMMENT_UPDATED, {
          commentUpdated: comment
        });
        return comment;
      } catch (error) {
        throw new Error(`Failed to update comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    deleteComment: async (_: any, { id }: { id: string }) => {
      try {
        await commentService.deleteComment(id);
        // Publish comment deleted event
        pubsub.publish(EVENTS.COMMENT_DELETED, {
          commentDeleted: id
        });
        return {
          success: true,
          message: 'Comment deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Department Mutations
    createDepartment: async (_: any, { input }: { input: any }) => {
      try {
        const department = await departmentService.createDepartment(input);
        // Publish department created event
        pubsub.publish(EVENTS.DEPARTMENT_CREATED, {
          departmentCreated: department
        });
        return department;
      } catch (error) {
        throw new Error(`Failed to create department: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    updateDepartment: async (_: any, { id, tenantId, input }: { id: string; tenantId: string; input: any }) => {
      try {
        const department = await departmentService.updateDepartment(id, tenantId, input);
        // Publish department updated event
        pubsub.publish(EVENTS.DEPARTMENT_UPDATED, {
          departmentUpdated: department
        });
        return department;
      } catch (error) {
        throw new Error(`Failed to update department: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    deleteDepartment: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        await departmentService.deleteDepartment(id, tenantId);
        // Publish department deleted event
        pubsub.publish(EVENTS.DEPARTMENT_DELETED, {
          departmentDeleted: id
        });
        return {
          success: true,
          message: 'Department deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete department: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Workflow Mutations
    createWorkflow: async (_: any, { input }: { input: any }) => {
      try {
        const workflow = await workflowService.createWorkflow(input);
        // Publish workflow created event
        pubsub.publish(EVENTS.WORKFLOW_CREATED, {
          workflowCreated: workflow
        });
        return workflow;
      } catch (error) {
        throw new Error(`Failed to create workflow: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    updateWorkflow: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const workflow = await workflowService.updateWorkflow(id, input);
        // Publish workflow updated event
        pubsub.publish(EVENTS.WORKFLOW_UPDATED, {
          workflowUpdated: workflow
        });
        return workflow;
      } catch (error) {
        throw new Error(`Failed to update workflow: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    deleteWorkflow: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        await workflowService.deleteWorkflow(id, tenantId);
        // Publish workflow deleted event
        pubsub.publish(EVENTS.WORKFLOW_DELETED, {
          workflowDeleted: id
        });
        return {
          success: true,
          message: 'Workflow deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete workflow: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    executeWorkflow: async (_: any, { input }: { input: any }) => {
      try {
        const result = await workflowService.executeWorkflow(input.workflowId, input.ticketId, input.tenantId);
        // Publish workflow executed event
        pubsub.publish(EVENTS.WORKFLOW_EXECUTED, {
          workflowExecuted: {
            success: true,
            message: 'Workflow executed successfully',
            result: result
          }
        });
        return {
          success: true,
          message: 'Workflow executed successfully',
          result: result
        };
      } catch (error) {
        throw new Error(`Failed to execute workflow: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },

  Subscription: {
    ticketCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.TICKET_CREATED])
    },
    ticketUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.TICKET_UPDATED])
    },
    ticketDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.TICKET_DELETED])
    },
    ticketAssigned: {
      subscribe: () => pubsub.asyncIterator([EVENTS.TICKET_ASSIGNED])
    },
    ticketStatusChanged: {
      subscribe: () => pubsub.asyncIterator([EVENTS.TICKET_STATUS_CHANGED])
    },
    commentCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.COMMENT_CREATED])
    },
    commentUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.COMMENT_UPDATED])
    },
    commentDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.COMMENT_DELETED])
    },
    departmentCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.DEPARTMENT_CREATED])
    },
    departmentUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.DEPARTMENT_UPDATED])
    },
    departmentDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.DEPARTMENT_DELETED])
    },
    workflowCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.WORKFLOW_CREATED])
    },
    workflowUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.WORKFLOW_UPDATED])
    },
    workflowDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.WORKFLOW_DELETED])
    },
    workflowExecuted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.WORKFLOW_EXECUTED])
    }
  }
}; 