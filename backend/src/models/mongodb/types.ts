// MongoDB Model Types

// Article Types
export interface CreateArticleInput {
  tenantId: string;
  title: string;
  content: string;
  categoryId?: string;
  isPublished?: boolean;
  tags?: string[];
  authorId: string;
}

export interface UpdateArticleInput {
  title?: string;
  content?: string;
  categoryId?: string;
  isPublished?: boolean;
  tags?: string[];
}

export interface ArticleFilter {
  tenantId: string;
  page: number;
  limit: number;
  categoryId?: string;
  isPublished?: boolean;
  search?: string;
  tags?: string[];
}

// Category Types
export interface CreateCategoryInput {
  tenantId: string;
  name: string;
  description?: string;
  parentId?: string;
  slug: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  parentId?: string;
  slug?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CategoryFilter {
  tenantId: string;
  page: number;
  limit: number;
  parentId?: string;
  search?: string;
}

// Notification Types
export interface CreateNotificationInput {
  tenantId: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  channel: 'email' | 'sms' | 'push' | 'in_app';
  recipientId: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
  expiresAt?: Date;
}

export interface UpdateNotificationInput {
  title?: string;
  message?: string;
  isRead?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
}

export interface NotificationFilter {
  tenantId: string;
  page: number;
  limit: number;
  userId?: string;
  isRead?: boolean;
  type?: string;
  channel?: string;
  priority?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Audit Types
export interface CreateAuditLogInput {
  tenantId: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  ipAddress: string;
  userAgent?: string;
  details?: Record<string, any>;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface AuditLogFilter {
  tenantId: string;
  page: number;
  limit: number;
  action?: string;
  resource?: string;
  userId?: string;
  resourceId?: string;
  severity?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
