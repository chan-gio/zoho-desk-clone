import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

const router = Router();
const controller = new SearchController();

router.use(apiRateLimiter, authMiddleware, tenantGuard);

router.get('/articles', (req, res, next) => controller.searchArticles(req, res, next));
router.get('/categories', (req, res, next) => controller.searchCategories(req, res, next));

export default router; 