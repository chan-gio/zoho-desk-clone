import { v2 as cloudinary } from 'cloudinary';
import { getPrismaClient } from '../database/postgres.js';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

export class AvatarService {
  private get prisma() {
    return getPrismaClient();
  }

  // Upload avatar cho User
  async uploadUserAvatar(userId: string, file: Express.Multer.File): Promise<string> {
    try {
      // Upload trực tiếp lên Cloudinary từ buffer
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'zoho-desk-avatars',
            resource_type: 'image',
            transformation: [
              { width: 200, height: 200, crop: 'fill', gravity: 'face' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      });

      const avatarUrl = uploadResult?.secure_url || '';

      // Cập nhật avatar URL vào database
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: avatarUrl }
      });

      return avatarUrl;
    } catch (error) {
      console.error('Error uploading user avatar:', error);
      throw new Error('Failed to upload user avatar');
    }
  }

  // Upload avatar cho Tenant
  async uploadTenantAvatar(tenantId: string, file: Express.Multer.File): Promise<string> {
    try {
      // Upload trực tiếp lên Cloudinary từ buffer
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'zoho-desk-tenant-avatars',
            resource_type: 'image',
            transformation: [
              { width: 200, height: 200, crop: 'fill', gravity: 'face' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      });

      const avatarUrl = uploadResult?.secure_url || '';

      // Cập nhật avatar URL vào database
      await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { avatar: avatarUrl }
      });

      return avatarUrl;
    } catch (error) {
      console.error('Error uploading tenant avatar:', error);
      throw new Error('Failed to upload tenant avatar');
    }
  }

  // Update avatar cho User
  async updateUserAvatar(userId: string, file: Express.Multer.File): Promise<string> {
    try {
      // Lấy avatar cũ để xóa
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { avatar: true }
      });

      // Xóa avatar cũ nếu có
      if (user?.avatar) {
        await this.deleteOldAvatar(user.avatar);
      }

      // Upload avatar mới
      return await this.uploadUserAvatar(userId, file);
    } catch (error) {
      console.error('Error updating user avatar:', error);
      throw new Error('Failed to update user avatar');
    }
  }

  // Update avatar cho Tenant
  async updateTenantAvatar(tenantId: string, file: Express.Multer.File): Promise<string> {
    try {
      // Lấy avatar cũ để xóa
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { avatar: true }
      });

      // Xóa avatar cũ nếu có
      if (tenant?.avatar) {
        await this.deleteOldAvatar(tenant.avatar);
      }

      // Upload avatar mới
      return await this.uploadTenantAvatar(tenantId, file);
    } catch (error) {
      console.error('Error updating tenant avatar:', error);
      throw new Error('Failed to update tenant avatar');
    }
  }

  // Delete avatar cho User
  async deleteUserAvatar(userId: string): Promise<void> {
    try {
      // Lấy avatar URL
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { avatar: true }
      });

      if (user?.avatar) {
        // Xóa từ Cloudinary
        await this.deleteOldAvatar(user.avatar);

        // Xóa URL khỏi database
        await this.prisma.user.update({
          where: { id: userId },
          data: { avatar: null }
        });
      }
    } catch (error) {
      console.error('Error deleting user avatar:', error);
      throw new Error('Failed to delete user avatar');
    }
  }

  // Delete avatar cho Tenant
  async deleteTenantAvatar(tenantId: string): Promise<void> {
    try {
      // Lấy avatar URL
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { avatar: true }
      });

      if (tenant?.avatar) {
        // Xóa từ Cloudinary
        await this.deleteOldAvatar(tenant.avatar);

        // Xóa URL khỏi database
        await this.prisma.tenant.update({
          where: { id: tenantId },
          data: { avatar: null }
        });
      }
    } catch (error) {
      console.error('Error deleting tenant avatar:', error);
      throw new Error('Failed to delete tenant avatar');
    }
  }

  // Get avatar URL cho User
  async getUserAvatarUrl(userId: string): Promise<string | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { avatar: true }
      });

      return user?.avatar || null;
    } catch (error) {
      console.error('Error getting user avatar URL:', error);
      throw new Error('Failed to get user avatar URL');
    }
  }

  // Get avatar URL cho Tenant
  async getTenantAvatarUrl(tenantId: string): Promise<string | null> {
    try {
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { avatar: true }
      });

      return tenant?.avatar || null;
    } catch (error) {
      console.error('Error getting tenant avatar URL:', error);
      throw new Error('Failed to get tenant avatar URL');
    }
  }

  // Generate default avatar cho User
  async generateDefaultUserAvatar(userId: string, username: string): Promise<string> {
    try {
      // Tạo avatar mặc định từ username
      const firstLetter = username.charAt(0).toUpperCase() || 'U';
      const backgroundColor = this.getRandomColor();
      const textColor = this.getContrastColor(backgroundColor);

      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=${backgroundColor.replace('#', '')}&color=${textColor.replace('#', '')}&size=200&format=png`;

      // Cập nhật vào database
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: avatarUrl }
      });

      return avatarUrl;
    } catch (error) {
      console.error('Error generating default user avatar:', error);
      throw new Error('Failed to generate default user avatar');
    }
  }

  // Generate default avatar cho Tenant
  async generateDefaultTenantAvatar(tenantId: string, tenantName: string): Promise<string> {
    try {
      // Tạo avatar mặc định từ tên tenant
      const firstLetter = tenantName.charAt(0).toUpperCase() || 'T';
      const backgroundColor = this.getRandomColor();
      const textColor = this.getContrastColor(backgroundColor);

      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=${backgroundColor.replace('#', '')}&color=${textColor.replace('#', '')}&size=200&format=png`;

      // Cập nhật vào database
      await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { avatar: avatarUrl }
      });

      return avatarUrl;
    } catch (error) {
      console.error('Error generating default tenant avatar:', error);
      throw new Error('Failed to generate default tenant avatar');
    }
  }

  // Helper methods
  private async deleteOldAvatar(avatarUrl: string): Promise<void> {
    try {
      const publicId = this.extractPublicId(avatarUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error('Error deleting old avatar from Cloudinary:', error);
      // Không throw error để không làm fail operation chính
    }
  }

  private extractPublicId(url: string): string | null {
    const match = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp)$/);
    return match?.[1] || null;
  }

  private getRandomColor(): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FECA57', '#FF9F43', '#EE5A24', '#10AC84',
      '#5F27CD', '#00D2D3', '#FF9FF3', '#54A0FF'
    ];
    return colors[Math.floor(Math.random() * colors.length)] || '#4ECDC4';
  }

  private getContrastColor(hexColor: string): string {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}
