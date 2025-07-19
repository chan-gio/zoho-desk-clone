import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { User, UserRole } from '../../../../shared/prisma/generated/client';
import { UnauthorizedError } from '../../../../shared/src/errors/auth.error';
import { generateJWT, verifyJWT, hashPassword, generateRefreshToken } from '../../../../shared/src/utils/encryption';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { TenantRepository } from '../repositories/tenant.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const tenantRepo = new TenantRepository(prisma);

// Khởi tạo Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string; user: User }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const access_token = generateJWT({ id: user.id, role: user.role, tenantId: user.tenantId });
    const refresh_token = generateRefreshToken({ sub: user.id, type: 'refresh' });
    await this.userRepo.saveRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token, user };
  }

  async validateToken(token: string): Promise<any> {
    return verifyJWT(token);
  }

  async register({ username, email, password, role, tenantName }: { username: string; email: string; password: string; role: string; tenantName?: string }) {
    // Validate input
    if (!username || !email || !password || !role) throw new Error('Missing required fields');
    // Check if user exists
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('User already exists');
    // Hash password
    const passwordHash = await hashPassword(password);
    let tenantId: string | undefined = undefined;
    if (role === 'admin' && tenantName) {
      // Create tenant if admin and tenantName provided
      const tenant = await tenantRepo.createTenant(tenantName);
      tenantId = tenant.id;
    } else if (role !== 'admin' && !tenantName) {
      throw new Error('Tenant required for non-admin');
    }
    // Create user
    const user = await this.userRepo.createUser({
      username,
      email,
      passwordHash,
      role: role as UserRole,
      tenantId: tenantId as string,
    });
    return user;
  }

  async refreshToken(refreshToken: string) {
    // Validate refresh token
    const user = await this.userRepo.getUserByRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedError('Invalid refresh token');
    // Generate new access token
    const token = generateJWT({ sub: user.id, role: user.role, tenantId: user.tenantId });
    return { access_token: token };
  }

  async forgotPassword(email: string) {
    // Find user
    const user = await this.userRepo.findByEmail(email);
    if (!user) return; // Không tiết lộ user tồn tại
    
    // Generate reset token
    const resetToken = uuidv4();
    const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 phút
    await this.userRepo.saveResetPasswordToken(user.id, resetToken, expiry);
    
    // Send email using Resend
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
        to: [email],
        subject: 'Reset your password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>You have requested to reset your password. Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p><strong>This link will expire in 30 minutes.</strong></p>
            <p>If you did not request this password reset, please ignore this email.</p>
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              If the button doesn't work, copy and paste this link into your browser:
              <br>
              <a href="${resetUrl}">${resetUrl}</a>
            </p>
          </div>
        `
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    // Find user by reset token
    const user: any = await this.userRepo.getUserByResetToken(token);
    if (!user || !user.resetPasswordTokenExpiry || user.resetPasswordTokenExpiry < new Date()) {
      throw new UnauthorizedError('Invalid or expired token');
    }
    // Hash new password
    const passwordHash = await hashPassword(newPassword);
    await this.userRepo.updateUserProfile(user.id, { passwordHash, resetPasswordToken: null, resetPasswordTokenExpiry: null });
  }
}