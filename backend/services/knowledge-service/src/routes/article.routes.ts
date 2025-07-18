import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';
import { requireRole } from '../../../../shared/src/middlewares/rbac.middleware';

const router = Router();
const controller = new ArticleController();

router.use(apiRateLimiter, authMiddleware, tenantGuard);

router.post('/', requireRole('agent', 'admin'), (req, res, next) => controller.create(req, res, next));
router.get('/', (req, res, next) => controller.list(req, res, next));
router.get('/search', (req, res, next) => controller.search(req, res, next));
router.get('/:id', (req, res, next) => controller.getById(req, res, next));
router.put('/:id', requireRole('agent', 'admin'), (req, res, next) => controller.update(req, res, next));
router.delete('/:id',requireRole('admin'), (req, res, next) => controller.delete(req, res, next));

export default router; 