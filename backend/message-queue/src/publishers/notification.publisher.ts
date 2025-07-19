import { getRabbitMQChannel } from '../config/rabbitmq';

const NOTIFICATION_QUEUE = 'notification_events';

/**
 * Publish a notification event to RabbitMQ
 * @param event - Event type (e.g., send, read)
 * @param data - Notification data payload
 */
export async function publishNotificationEvent(event: string, data: any) {
  const channel = await getRabbitMQChannel();
  await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });
  channel.sendToQueue(NOTIFICATION_QUEUE, Buffer.from(JSON.stringify({ event, data })), {
    persistent: true,
  });
} 