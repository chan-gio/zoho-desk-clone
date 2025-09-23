import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';

const router = Router();

// Auth routes
router.post('/login', apiRateLimiter, AuthController.login);
router.post('/register', apiRateLimiter, AuthController.register);
router.post('/refresh', apiRateLimiter, AuthController.refresh);
router.post('/forgot-password', apiRateLimiter, AuthController.forgotPassword);
router.post('/reset-password', apiRateLimiter, AuthController.resetPassword);
router.get('/verify', AuthController.verifyToken);

export default router;
