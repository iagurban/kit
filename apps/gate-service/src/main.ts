import 'reflect-metadata';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './modules/app/app.module';

void fastifyBootstrap(AppModule, {});
