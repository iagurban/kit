import 'reflect-metadata';

import { join } from 'node:path';

import httpProxy from '@fastify/http-proxy';
import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './modules/app/app.module';
import { GraphqlGatewayManager } from './modules/gateway/graphql-gateway.manager';

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
  onAppCreated: async app => {
    const gatewayManager = app.get(GraphqlGatewayManager);
    const fastifyInstance = app.getHttpAdapter().getInstance();

    // await fastifyInstance.register(websocket);

    await fastifyInstance.register(httpProxy, {
      upstream: `http://localhost:${gatewayManager.internalPort}`,
      wsUpstream: `ws://localhost:${gatewayManager.internalPort}`,
      prefix: '/graphql',
      rewritePrefix: '/graphql',
      websocket: true,
      // wsClientOptions: {
      //   queryString: (search, reqUrl, request): string => {
      //     console.log(`wsClientOptions`);
      //     throw 123;
      //   },
      // },
      // wsServerOptions: {
      //   verifyClient: () => {
      //     console.log(`verifyClient`);
      //     return true;
      //   },
      //   handleProtocols: () => {
      //     console.log(`handleProtocols`);
      //     return false;
      //   },
      // },
      preHandler: async (req, reply) => {
        console.log(`[gate-service] Attempting to proxy request for ${req.url} by ${req.protocol}`);
        await gatewayManager.waitForAvailability();
      },
      replyOptions: {
        onError: (reply, error: unknown) => {
          console.error('Proxy error in controller:', error);
          if (!reply.sent) {
            reply.status(500).send({ message: 'Proxy error' });
          }
        },
      },
    });
  },
});
