import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository.js';
import { User, UserRole } from '../../prisma/generated/client/index.js';
import { UnauthorizedError } from '../shared/errors/auth.error.js';
import { generateJWT, verifyJWT, hashPassword, generateRefreshToken } from '../shared/utils/encryption.js';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { TenantRepository } from '../repositories/tenant.repository.js';
import { PrismaClient } from '../../prisma/generated/client/index.js';
import { ColumnService } from './column.service.js';
import { PriorityService } from './priority.service.js';
import { StatusService } from './status.service.js';

const prisma = new PrismaClient();
const tenantRepo = new TenantRepository(prisma);

// Khởi tạo Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string; user: User; tenants: any[] }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Tạo JWT không có tenantId ban đầu
    const access_token = generateJWT({ id: user.id, role: user.role });
    const refresh_token = generateRefreshToken({ sub: user.id, type: 'refresh' });
    await this.userRepo.saveRefreshToken(user.id, refresh_token);

    // Lấy danh sách tenants mà user có quyền truy cập
    const tenants = await this.getUserTenants(user.id);

    return { access_token, refresh_token, user, tenants };
  }

  async getUserTenants(userId: string): Promise<any[]> {
    // Lấy user với thông tin tenant
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Nếu user có tenantId, trả về tenant đó
    if (user.tenantId) {
      const tenant = await tenantRepo.findById(user.tenantId);
      return tenant ? [tenant] : [];
    }

    // Nếu là super_admin, trả về tất cả tenants
    if (user.role === 'super_admin') {
      return await tenantRepo.findAll();
    }

    return [];
  }

  async selectTenant(userId: string, tenantId: string): Promise<{ access_token: string; tenant: any }> {
    // Kiểm tra user có quyền truy cập tenant này không
    const userTenants = await this.getUserTenants(userId);
    const hasAccess = userTenants.some(tenant => tenant.id === tenantId);
    
    if (!hasAccess) {
      throw new UnauthorizedError('User does not have access to this tenant');
    }

    // Tạo JWT mới với tenantId
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const access_token = generateJWT({ id: user.id, role: user.role, tenantId });
    const tenant = await tenantRepo.findById(tenantId);

    return { access_token, tenant };
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
      // Kiểm tra tenant đã tồn tại chưa
      const existingTenant = await tenantRepo.findByName(tenantName);
      console.log('Looking for tenant:', tenantName);
      console.log('Existing tenant found:', existingTenant);
      
      if (existingTenant) {
        // Nếu tenant đã tồn tại, sử dụng tenant đó
        tenantId = existingTenant.id;
        console.log('Using existing tenant ID:', tenantId);
      } else {
        // Nếu tenant chưa tồn tại, tạo mới
        console.log('Creating new tenant:', tenantName);
        const tenant = await tenantRepo.create({ name: tenantName });
        tenantId = tenant.id;
        console.log('Created new tenant ID:', tenantId);
        
        // Tự động khởi tạo columns, priorities và statuses mặc định cho tenant mới
        try {
          const columnService = new ColumnService();
          const priorityService = new PriorityService();
          const statusService = new StatusService();

          // Khởi tạo song song
          await Promise.all([
            columnService.initializeDefaultColumns(tenantId),
            priorityService.initializeDefaultPriorities(tenantId),
            statusService.initializeDefaultStatuses(tenantId)
          ]);

          console.log('Default columns, priorities and statuses initialized for tenant:', tenantName);
        } catch (error) {
          console.error('Failed to initialize default data:', error);
          // Không throw error để không làm fail việc tạo user
        }
      }
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
    const token = generateJWT({ id: user.id, role: user.role, tenantId: user.tenantId });
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