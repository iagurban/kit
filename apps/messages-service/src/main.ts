import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/modules/register-grpc-module';
import { join } from 'path';

import { AppModule } from './app.module';
import { messagesGRPCConfig } from './grpc/messages.grpc-config';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('MESSAGES_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('MESSAGES_SERVICE_HOST', '0.0.0.0'),
  microservices: async (app, configService) => [
    await createGRPCMicroservice(app, messagesGRPCConfig.config(configService), join(__dirname, '../certs')),
  ],
});
