import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/modules/register-grpc-module';

import { AppModule } from './app.module';
import { chatsGRPCConfig } from './grpc/chats.grpc-config';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('CHATS_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('CHATS_SERVICE_HOST', '0.0.0.0'),
  microservices: async (app, config) => [
    await createGRPCMicroservice(app, config, chatsGRPCConfig.config(config)),
  ],
});
