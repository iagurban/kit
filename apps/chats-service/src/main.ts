import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/register-grpc-module';
import { join } from 'path';

import { AppModule } from './app.module';
import { chatsGRPCConfig } from './grpc/chats.grpc-config';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('CHATS_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('CHATS_SERVICE_HOST', '0.0.0.0'),
  microservices: (_app, configService) => [
    createGRPCMicroservice(chatsGRPCConfig.config(configService), join(__dirname, '../certs')),
  ],
});
