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
        url: config.getOrThrow<string>('GRPC_URL'),
        package: 'messages',
        protoPath: join(__dirname, 'messages.proto'),
        loader: { keepCase: true },
      },
    },
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: config.getOrThrow<string>('KAFKA_BROKERS').split(','),
        },
        consumer: {
          groupId: config.getOrThrow<string>('KAFKA_CONSUMER_GROUP'),
        },
      },
    },
  ],
});
