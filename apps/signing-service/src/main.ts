import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/modules/register-grpc-module';

import { AppModule } from './app.module';
import { privateSigningGRPCConfig } from './grpc/signing.grpc-config';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('SIGNING_SERVICE_INTERNAL_PORT'), {
  server: config => config.getOrThrow<string>('SIGNING_SERVICE_INTERNAL_HOST', '0.0.0.0'),
  http2: true,
  microservices: async (app, config) => [
    await createGRPCMicroservice(app, config, privateSigningGRPCConfig.config(config)),
  ],
});
