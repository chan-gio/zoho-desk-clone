import { getRabbitMQChannel } from '../config/rabbitmq';

const NOTIFICATION_QUEUE = 'notification_events';

/**
 * Start notification event consumer
 * @param handler - Function to process each notification event
 */
export async function startNotificationConsumer(handler: (event: string, data: any) => Promise<void>) {
  const channel = await getRabbitMQChannel();
  await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });
  channel.consume(NOTIFICATION_QUEUE, async (msg) => {
    if (msg) {
      const { event, data } = JSON.parse(msg.content.toString());
      await handler(event, data);
      channel.ack(msg);
    }
  });
} 