import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/register-grpc-module';

import { messagesGRPCConfig } from './grpc/messages.grpc-config';
import { AppModule } from './modules/app.module';
import {join} from "path";

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('MESSAGES_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('MESSAGES_SERVICE_HOST', '0.0.0.0'),
  microservices: (_app, configService) => [createGRPCMicroservice(messagesGRPCConfig.config(configService), join(__dirname, "../certs"))],
});
