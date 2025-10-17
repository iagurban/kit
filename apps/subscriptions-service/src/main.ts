import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './modules/app.module';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('SUBSCRIPTIONS_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('SUBSCRIPTIONS_SERVICE_HOST', '0.0.0.0'),
});
