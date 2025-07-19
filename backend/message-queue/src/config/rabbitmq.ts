import amqp from 'amqplib';

let connection: any = null;
let channel: any = null;

/**
 * Get or create a singleton RabbitMQ channel
 * Ensures only one connection/channel is used per service instance
 */
export async function getRabbitMQChannel(): Promise<any> {
  if (channel) return channel;
  const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  return channel;
}

// Graceful shutdown
process.on('exit', () => {
  if (connection) connection.close();
}); 