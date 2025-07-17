import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';

const router = Router();

router.post('/login', apiRateLimiter, AuthController.login);
router.post('/register', apiRateLimiter, AuthController.register);
router.post('/refresh', apiRateLimiter, AuthController.refresh);
router.post('/forgot-password', apiRateLimiter, AuthController.forgotPassword);
router.post('/reset-password', apiRateLimiter, AuthController.resetPassword);

export default router; 