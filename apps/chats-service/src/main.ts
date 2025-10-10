import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/register-grpc-module';

import { AppModule } from './modules/app.module';
import { chatsGRPCConfig } from './modules/chats/chats.grpc-config';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('CHATS_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('CHATS_SERVICE_HOST', '0.0.0.0'),
  microservices: (_app, configService) => [createGRPCMicroservice(chatsGRPCConfig(configService))],
});
