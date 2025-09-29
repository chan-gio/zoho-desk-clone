import { Router } from 'express';
import { ColumnController } from '../controllers/column.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Tất cả routes đều cần authentication
router.use(authMiddleware);

// Utility endpoints
router.post('/initialize-defaults', ColumnController.initializeDefaultColumns);
router.get('/:columnId/tickets', ColumnController.getTicketsByColumn);

// Ticket operations
router.put('/move-ticket', ColumnController.moveTicketToColumn);

// Column CRUD operations
router.post('/', ColumnController.createColumn);
router.get('/', ColumnController.getColumnsByTenant);
router.get('/:id', ColumnController.getColumnById);
router.put('/:id', ColumnController.updateColumn);
router.delete('/:id', ColumnController.deleteColumn);

// Column ordering
router.put('/reorder', ColumnController.reorderColumns);

export default router;
