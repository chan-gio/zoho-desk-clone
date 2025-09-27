import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '../shared/utils/response.js';
import { ColumnService } from '../services/column.service.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

// Lazy initialization để tránh vấn đề khởi tạo Prisma client
let columnService: ColumnService | null = null;

const getColumnService = (): ColumnService => {
  if (!columnService) {
    columnService = new ColumnService();
  }
  return columnService;
};

export class ColumnController {
  // Tạo column mới
  static async createColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, color, isDefault } = req.body;
      const tenantId = (req as any).user?.tenantId;

      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      if (!name) {
        return res.status(400).json(errorResponse({ error: 'Column name is required' }));
      }

      const column = await getColumnService().createColumn({
        name,
        description,
        color,
        isDefault,
        tenantId
      });

      return res.status(201).json(successResponse({ data: column, message: 'Column created successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Lấy tất cả columns của tenant
  static async getColumnsByTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;

      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const columns = await getColumnService().getColumnsByTenant(tenantId);
      return res.json(successResponse({ data: columns, message: 'Columns retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Lấy column theo ID
  static async getColumnById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Column ID is required' }));
      }

      const column = await getColumnService().getColumnById(id);
      if (!column) {
        return res.status(404).json(errorResponse({ error: 'Column not found' }));
      }

      return res.json(successResponse({ data: column, message: 'Column retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Cập nhật column
  static async updateColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, order, color, isDefault } = req.body;

      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Column ID is required' }));
      }

      const column = await getColumnService().updateColumn(id, {
        name,
        description,
        order,
        color,
        isDefault
      });

      if (!column) {
        return res.status(404).json(errorResponse({ error: 'Column not found' }));
      }

      return res.json(successResponse({ data: column, message: 'Column updated successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Xóa column
  static async deleteColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Column ID is required' }));
      }

      const deleted = await getColumnService().deleteColumn(id);
      if (!deleted) {
        return res.status(404).json(errorResponse({ error: 'Column not found' }));
      }

      return res.json(successResponse({ data: null, message: 'Column deleted successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Sắp xếp lại thứ tự các columns
  static async reorderColumns(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const { columnOrders } = req.body;

      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      if (!columnOrders || !Array.isArray(columnOrders)) {
        return res.status(400).json(errorResponse({ error: 'Column orders array is required' }));
      }

      const columns = await getColumnService().reorderColumns(tenantId, columnOrders);
      return res.json(successResponse({ data: columns, message: 'Columns reordered successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Di chuyển ticket sang column khác
  static async moveTicketToColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { ticketId, fromColumnId, toColumnId, newOrder } = req.body;

      if (!ticketId || !toColumnId || newOrder === undefined) {
        return res.status(400).json(errorResponse({ 
          error: 'Ticket ID, target column ID, and new order are required' 
        }));
      }

      const ticket = await getColumnService().moveTicketToColumn({
        ticketId,
        fromColumnId,
        toColumnId,
        newOrder
      });

      return res.json(successResponse({ data: ticket, message: 'Ticket moved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Sắp xếp lại thứ tự tickets trong column
  static async reorderTicketsInColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { columnId, ticketOrders } = req.body;

      if (!columnId || !ticketOrders || !Array.isArray(ticketOrders)) {
        return res.status(400).json(errorResponse({ 
          error: 'Column ID and ticket orders array are required' 
        }));
      }

      const tickets = await getColumnService().reorderTicketsInColumn({
        columnId,
        ticketOrders
      });

      return res.json(successResponse({ data: tickets, message: 'Tickets reordered successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Khởi tạo columns mặc định cho tenant
  static async initializeDefaultColumns(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;

      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const columns = await getColumnService().initializeDefaultColumns(tenantId);
      return res.status(201).json(successResponse({ data: columns, message: 'Default columns initialized successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Lấy tickets trong column
  static async getTicketsByColumn(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { columnId } = req.params;
      const tenantId = req.user?.tenantId;

      if (!columnId) {
        return res.status(400).json(errorResponse({ error: 'Column ID is required' }));
      }

      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      // Kiểm tra column thuộc về tenant hiện tại
      const column = await getColumnService().getColumnById(columnId);
      if (!column || column.tenantId !== tenantId) {
        return res.status(404).json(errorResponse({ error: 'Column not found' }));
      }

      const tickets = await getColumnService().getTicketsByColumn(columnId);
      return res.json(successResponse({ data: tickets, message: 'Tickets retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }
}
