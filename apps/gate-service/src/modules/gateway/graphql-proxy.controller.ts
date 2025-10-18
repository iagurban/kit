import httpProxy from '@fastify/http-proxy';
import { Controller, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyReply } from 'fastify';

import { GraphqlGatewayManager } from './graphql-gateway.manager';

@Controller()
export class GraphqlProxyController implements OnModuleInit {
  constructor(
    private readonly gatewayManager: GraphqlGatewayManager,
    private readonly adapterHost: HttpAdapterHost
  ) {}

  async onModuleInit() {
    const fastifyInstance = this.adapterHost.httpAdapter.getInstance();

    // Remove the default JSON parser to avoid conflict with the proxy.
    if (fastifyInstance.hasContentTypeParser('application/json')) {
      fastifyInstance.removeContentTypeParser('application/json');
    }

    await fastifyInstance.register(httpProxy, {
      upstream: `http://localhost:${this.gatewayManager.internalPort}`,
      prefix: '/graphql',
      // rewritePrefix: '/graphql',
      websocket: true,
      preHandler: async () => {
        await this.gatewayManager.waitForAvailability();
      },
      onError: (reply: FastifyReply, error: unknown) => {
        console.error('Proxy error in controller:', error);
        if (!reply.sent) {
          reply.status(500).send({ message: 'Proxy error' });
        }
      },
    });
  }
}
