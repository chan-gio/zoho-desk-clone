import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { PrismaClient } from '../../../../shared/prisma/generated/client';
import { successResponse } from '../../../../shared/src/utils/response';

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);
const authService = new AuthService(userRepo);

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const { access_token, refresh_token, user } = await authService.login(email, password);
      res.status(200).json(successResponse({
        data: { access_token, refresh_token, user },
        message: 'Login successful.',
        statusCode: 200,
      }));
    } catch (error) {
      next(error);
    }
  }

  static async verifyToken(req: Request, res: Response, _next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
      const payload = await authService.validateToken(token);
      res.status(200).json({ valid: true, payload });
    } catch (err) {
      res.status(401).json({ valid: false, error: 'Invalid token' });
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: validate input
      const result = await authService.register(req.body);
      res.status(201).json(successResponse({
        data: result,
        message: 'Register successful.',
        statusCode: 201,
      }));
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.body;
      const result = await authService.refreshToken(refresh_token);
      res.status(200).json(successResponse({
        data: result,
        message: 'Token refreshed.',
        statusCode: 200,
      }));
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res.status(200).json(successResponse({
        data: null,
        message: 'Reset email sent.',
        statusCode: 200,
      }));
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, new_password } = req.body;
      await authService.resetPassword(token, new_password);
      res.status(200).json(successResponse({
        data: null,
        message: 'Password reset successful.',
        statusCode: 200,
      }));
    } catch (error) {
      next(error);
    }
  }
}
