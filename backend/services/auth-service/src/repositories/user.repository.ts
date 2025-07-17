import { UserRole, PrismaClient } from '../../../../shared/prisma/generated/client';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: {
    email: string;
    username: string;
    passwordHash: string;
    role: UserRole;
    tenantId: string;
  }) {
    return this.prisma.user.create({ data });
  }

  async listUsersByTenant(tenantId: string) {
    return this.prisma.user.findMany({ where: { tenantId } });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUser(id: string, updates: Partial<{ username: string; role: UserRole; passwordHash: string }>) {
    return this.prisma.user.update({
      where: { id },
      data: updates,
    });
  }

  async findMany(params: { where: { tenantId: string } }) {
    return this.prisma.user.findMany(params);
  }

  async softDeleteUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateUserProfile(id: string, updates: Partial<{ username: string; email: string; passwordHash: string; role: UserRole; resetPasswordToken: string | null; resetPasswordTokenExpiry: Date | null }>) {
    return this.prisma.user.update({
      where: { id },
      data: updates,
    });
  }

  // Refresh token logic (for demo: store in user table, production: use Redis)
  async saveRefreshToken(userId: string, refreshToken: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async getUserByRefreshToken(refreshToken: string) {
    return this.prisma.user.findFirst({ where: { refreshToken } });
  }

  // Password reset token logic (for demo: store in user table, production: use Redis)
  async saveResetPasswordToken(userId: string, resetToken: string, resetTokenExpiry: Date) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { resetPasswordToken: resetToken, resetPasswordTokenExpiry: resetTokenExpiry },
    });
  }

  async getUserByResetToken(resetToken: string) {
    return this.prisma.user.findFirst({ where: { resetPasswordToken: resetToken } });
  }
}