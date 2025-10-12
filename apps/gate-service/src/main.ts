import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './modules/app/app.module';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('GATE_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('GATE_SERVICE_HOST', '0.0.0.0'),
  // microservices: (_app, configService) => [],
});
