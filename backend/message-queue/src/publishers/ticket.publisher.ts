import { getRabbitMQChannel } from '../config/rabbitmq';

const TICKET_QUEUE = 'ticket_events';

/**
 * Publish a ticket event to RabbitMQ
 * @param event - Event type (created, updated, deleted)
 * @param data - Ticket data payload
 */
export async function publishTicketEvent(event: string, data: any) {
  const channel = await getRabbitMQChannel();
  await channel.assertQueue(TICKET_QUEUE, { durable: true });
  channel.sendToQueue(TICKET_QUEUE, Buffer.from(JSON.stringify({ event, data })), {
    persistent: true,
  });
} 