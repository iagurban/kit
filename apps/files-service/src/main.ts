import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './app.module';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('FILES_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('FILES_SERVICE_HOST', '0.0.0.0'),
  microservices: (_app, configService) => [
    // createGRPCMicroservice(chatsGRPCConfig.config(configService), join(__dirname, '../certs')),
  ],
});
