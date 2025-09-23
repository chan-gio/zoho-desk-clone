import { Notification, INotification } from '../../models/mongodb/notification.schema.js';
import { CreateNotificationInput, UpdateNotificationInput, NotificationFilter } from '../../models/mongodb/types.js';

export class NotificationRepository {
  async create(data: CreateNotificationInput): Promise<INotification> {
    const notification = new Notification(data);
    return await notification.save();
  }

  async findById(id: string): Promise<INotification | null> {
    return await Notification.findById(id).exec();
  }

  async findMany(filter: NotificationFilter): Promise<INotification[]> {
    const query: any = {
      tenantId: filter.tenantId
    };

    if (filter.userId) {
      query.userId = filter.userId;
    }

    if (filter.isRead !== undefined) {
      query.isRead = filter.isRead;
    }

    if (filter.type) {
      query.type = filter.type;
    }

    if (filter.channel) {
      query.channel = filter.channel;
    }

    if (filter.priority) {
      query.priority = filter.priority;
    }

    if (filter.dateFrom || filter.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    return await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip((filter.page - 1) * filter.limit)
      .limit(filter.limit)
      .exec();
  }

  async count(filter: NotificationFilter): Promise<number> {
    const query: any = {
      tenantId: filter.tenantId
    };

    if (filter.userId) {
      query.userId = filter.userId;
    }

    if (filter.isRead !== undefined) {
      query.isRead = filter.isRead;
    }

    if (filter.type) {
      query.type = filter.type;
    }

    if (filter.channel) {
      query.channel = filter.channel;
    }

    if (filter.priority) {
      query.priority = filter.priority;
    }

    if (filter.dateFrom || filter.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    return await Notification.countDocuments(query).exec();
  }

  async update(id: string, data: UpdateNotificationInput): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await Notification.findByIdAndDelete(id).exec();
    return !!result;
  }

  async markAsRead(id: string): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(
      id,
      { isRead: true, readAt: new Date(), updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async markAllAsRead(userId: string, tenantId: string): Promise<number> {
    const result = await Notification.updateMany(
      { userId, tenantId, isRead: false },
      { isRead: true, readAt: new Date(), updatedAt: new Date() }
    ).exec();
    return result.modifiedCount;
  }

  async getUnreadCount(userId: string, tenantId: string): Promise<number> {
    return await Notification.countDocuments({
      userId,
      tenantId,
      isRead: false
    }).exec();
  }

  async findByUser(userId: string, tenantId: string, limit: number = 50): Promise<INotification[]> {
    return await Notification.find({
      userId,
      tenantId
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async deleteExpired(): Promise<number> {
    const result = await Notification.deleteMany({
      expiresAt: { $lt: new Date() }
    }).exec();
    return result.deletedCount;
  }

  async getNotificationStats(tenantId: string, dateFrom?: Date, dateTo?: Date): Promise<{
    total: number;
    unread: number;
    byType: Record<string, number>;
    byChannel: Record<string, number>;
  }> {
    const query: any = { tenantId };
    
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) {
        query.createdAt.$gte = dateFrom;
      }
      if (dateTo) {
        query.createdAt.$lte = dateTo;
      }
    }

    const [total, unread, byType, byChannel] = await Promise.all([
      Notification.countDocuments(query).exec(),
      Notification.countDocuments({ ...query, isRead: false }).exec(),
      Notification.aggregate([
        { $match: query },
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]).exec(),
      Notification.aggregate([
        { $match: query },
        { $group: { _id: '$channel', count: { $sum: 1 } } }
      ]).exec()
    ]);

    return {
      total,
      unread,
      byType: byType.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byChannel: byChannel.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };
  }
}
