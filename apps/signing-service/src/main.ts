import 'reflect-metadata';

import { join } from 'node:path';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createGRPCMicroservice } from '@poslah/util/modules/register-grpc-module';

import { AppModule } from './app.module';
import { privateSigningGRPCConfig } from './grpc/signing.grpc-config';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('SIGNING_SERVICE_INTERNAL_PORT'), {
  server: config => config.getOrThrow<string>('SIGNING_SERVICE_INTERNAL_HOST', '0.0.0.0'),
  http2: { certsDir: join(__dirname, '../certs') },
  microservices: async (app, configService) => [
    await createGRPCMicroservice(
      app,
      privateSigningGRPCConfig.config(configService),
      null /* no mTLS, it's made by proxy */
    ),
  ],
});
