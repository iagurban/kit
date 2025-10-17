import 'reflect-metadata';

import { join } from 'node:path';

import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './modules/app/app.module';

void fastifyBootstrap(AppModule, config => config.getOrThrow<number>('GATE_SERVICE_PORT'), {
  server: config => config.getOrThrow<string>('GATE_SERVICE_HOST', '0.0.0.0'),
  cors: {
    origin: (origin, cb) => {
      // console.log(`>>> Origin 1: ${origin}`);
      cb(null, !origin || origin === `https://localhost:3000`);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  },
  https: { certsDir: join(__dirname, '../certs') },
});
