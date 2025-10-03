import 'reflect-metadata';

import { Transport } from '@nestjs/microservices';
import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { join } from 'path';

import { AppModule } from './modules/app.module';

void fastifyBootstrap(AppModule, {
  microservices: (_app, config) => [
    {
      transport: Transport.GRPC,
      options: {
        url: config.getOrThrow<string>('MESSAGES_SERVICE_GRPC_URL'),
        package: 'messages',
        protoPath: join(__dirname, 'grpc/messages.proto'),
        loader: { keepCase: true },
      },
    },
    // {
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       brokers: config.getOrThrow<string>('KAFKA_BROKERS').split(','),
    //     },
    //     consumer: {
    //       groupId: config.getOrThrow<string>('MESSAGES_SERVICE_KAFKA_CONSUMER_GROUP'),
    //     },
    //   },
    // },

    // --- RabbitMQ for consuming events ---
    (() => {
      const user = config.getOrThrow<string>('RABBITMQ_USER');
      const pass = config.getOrThrow<string>('RABBITMQ_PASS');
      const host = config.getOrThrow<string>('RABBITMQ_HOST');
      const port = config.getOrThrow<string>('RABBITMQ_PORT');

      return {
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${user}:${pass}@${host}:${port}`],
          queue: 'messages_events_queue',

          // CRITICAL: This enables manual acknowledgement mode.
          // Your controller MUST call channel.ack() or channel.nack().
          noAck: false,

          // Flow control: Tells RabbitMQ to only send one message at a time
          // to this worker. It won't send the next one until the current one is ack'd/nack'd.
          prefetchCount: 1,

          queueOptions: {
            // Ensures the queue and its messages survive a RabbitMQ server restart.
            durable: true,

            // --- Dead Letter Queue (DLQ) Configuration ---
            // If a message is rejected (nack'd), send it to this exchange.
            // An empty string '' means the default AMQP exchange.
            deadLetterExchange: '',

            // When sending to the dead letter exchange, use this as the routing key.
            // This effectively becomes the name of our DLQ.
            deadLetterRoutingKey: 'messages_events_dlq',
          },
        },
      };
    })(),
  ],
});
