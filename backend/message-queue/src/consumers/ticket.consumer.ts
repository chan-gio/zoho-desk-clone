import { getRabbitMQChannel } from '../config/rabbitmq';

const TICKET_QUEUE = 'ticket_events';

/**
 * Start ticket event consumer
 * @param handler - Function to process each ticket event
 */
export async function startTicketConsumer(handler: (event: string, data: any) => Promise<void>) {
  const channel = await getRabbitMQChannel();
  await channel.assertQueue(TICKET_QUEUE, { durable: true });
  channel.consume(TICKET_QUEUE, async (msg) => {
    if (msg) {
      const { event, data } = JSON.parse(msg.content.toString());
      await handler(event, data);
      channel.ack(msg);
    }
  });
} 