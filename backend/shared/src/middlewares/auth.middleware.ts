import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/encryption';
import { AuthenticatedUser } from '../types/user.types';
import { TOKEN_HEADER } from '../utils/constants';

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers[TOKEN_HEADER.toLowerCase()] || req.headers['authorization'];

  if (!authHeader || typeof authHeader !== 'string') {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  const token = authHeader.replace(/^Bearer\s/, '');

  try {
    const user = verifyJWT<AuthenticatedUser>(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
