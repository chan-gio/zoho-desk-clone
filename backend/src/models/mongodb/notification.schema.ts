import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  _id: string;
  tenantId: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  channel: string;
  recipientId: string;
  isRead: boolean;
  readAt?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    maxlength: 50
  },
  channel: {
    type: String,
    required: true,
    enum: ['email', 'sms', 'push', 'in_app'],
    default: 'in_app'
  },
  recipientId: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  metadata: {
    type: Schema.Types.Mixed
  },
  expiresAt: {
    type: Date,
    index: { expireAfterSeconds: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'notifications'
});

// Indexes
NotificationSchema.index({ tenantId: 1, userId: 1, isRead: 1 });
NotificationSchema.index({ tenantId: 1, type: 1 });
NotificationSchema.index({ tenantId: 1, channel: 1 });
NotificationSchema.index({ expiresAt: 1 });

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
