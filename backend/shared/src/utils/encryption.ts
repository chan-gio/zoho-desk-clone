import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'insecure-default-key'; // replace in production
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';
const RF_EXPIRES_IN: string = process.env.RF_EXPIRES_IN || '7d';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function generateJWT(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  } as jwt.SignOptions);
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: RF_EXPIRES_IN
  } as jwt.SignOptions); 
}

export function verifyJWT<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}