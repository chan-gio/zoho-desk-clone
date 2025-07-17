import { PrismaClient, Workflow as PrismaWorkflow, Prisma } from '../../../../shared/prisma/generated/client';

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
    return this.prisma.workflow.delete({ where: { id } });
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
} 