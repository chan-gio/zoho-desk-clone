import { PrismaClient, Workflow as PrismaWorkflow, Prisma } from '../../prisma/generated/client/index.js';

export class WorkflowService {
  constructor(private prisma: PrismaClient) {}

  async createWorkflow(data: Prisma.WorkflowUncheckedCreateInput): Promise<PrismaWorkflow> {
    return this.prisma.workflow.create({ data });
  }

  async getWorkflowById(id: string, tenantId: string): Promise<PrismaWorkflow | null> {
    return this.prisma.workflow.findFirst({ where: { id, tenantId } });
  }

  async listWorkflows(params: { tenantId: string; page?: number; limit?: number }): Promise<{ data: PrismaWorkflow[]; total: number }> {
    const { tenantId, page = 1, limit = 20 } = params;
    const where = { tenantId };
    const [data, total] = await Promise.all([
      this.prisma.workflow.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.workflow.count({ where }),
    ]);
    return { data, total };
  }

  async updateWorkflow(id: string, data: Partial<Prisma.WorkflowUncheckedCreateInput>): Promise<PrismaWorkflow | null> {
    return this.prisma.workflow.update({ where: { id }, data });
  }

  async deleteWorkflow(id: string): Promise<PrismaWorkflow | null> {
    return this.prisma.workflow.deleteMany({ where: { id } }).then(() => null);
  }

  // Giả lập auto-assign agent dựa trên rule (có thể mở rộng NLP/AI)
  async autoAssign(_departmentId: string, tenantId: string): Promise<string | null> {
    // Lấy workflow rule cho tenant/department
    const workflow = await this.prisma.workflow.findFirst({ where: { tenantId } });
    if (!workflow) return null;
    // Giả lập: nếu có rule auto-assign, trả về agentId đầu tiên
    // (Thực tế: parse workflow.rules để quyết định agent phù hợp)
    const agent = await this.prisma.user.findFirst({ where: { tenantId, role: 'agent' } });
    return agent ? agent.id : null;
  }

  async executeWorkflow(workflowId: string, context: any): Promise<{ success: boolean; result?: any }> {
    try {
      const workflow = await this.getWorkflowById(workflowId, context.tenantId);
      if (!workflow) {
        return { success: false, result: { error: 'Workflow not found' } };
      }

      // Parse workflow rules and execute them
      const rules = workflow.rules as any;
      
      // Simple rule execution logic
      if (rules.autoAssign && context.ticketId) {
        const agentId = await this.autoAssign(context.departmentId, context.tenantId);
        if (agentId) {
          // Update ticket with assigned agent
          await this.prisma.ticket.update({
            where: { id: context.ticketId },
            data: { assigneeId: agentId }
          });
          return { success: true, result: { assignedAgent: agentId } };
        }
      }

      return { success: true, result: { message: 'Workflow executed successfully' } };
    } catch (error) {
      return { success: false, result: { error: 'Workflow execution failed' } };
    }
  }
}
