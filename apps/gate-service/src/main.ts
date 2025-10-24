import 'reflect-metadata';

import { join } from 'node:path';
import { URL } from 'node:url';

import httpProxy from '@fastify/http-proxy';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { ConfigService } from '@nestjs/config';
import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';

import { AppModule } from './app.module';
import { GraphqlGatewayManager } from './gateway-module/graphql-gateway.manager';
import { WsTicketsService } from './ws-tickets/ws-tickets.service';

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
    const configService = app.get(ConfigService);
    const fastifyInstance = app.getHttpAdapter().getInstance();
    const wsTicketsService = app.get(WsTicketsService);

    await fastifyInstance.register(httpProxy, {
      upstream: `http://localhost:${gatewayManager.internalPort}`,
      wsUpstream: configService.getOrThrow<string>('SUBSCRIPTIONS_SERVICE_WS_URL'),
      prefix: '/graphql',
      rewritePrefix: '/graphql',
      websocket: true,
      preHandler: async (req, reply) => {
        // console.log(`[gate-service] Attempting to proxy request for ${req.url} by ${req.protocol}`);
        // For HTTP requests, we wait for the gateway. For WS, we proxy directly.
        await gatewayManager.waitForAvailability();
      },
      wsServerOptions: {
        verifyClient: async (info, done) => {
          /// first-authentication for websockets
          const url = new URL(notNull(info.req.url), `ws://${info.req.headers.host}`);
          const ticket = url.searchParams.get('ticket');
          done(!!ticket && (await wsTicketsService.consume(ticket)));
        },
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
