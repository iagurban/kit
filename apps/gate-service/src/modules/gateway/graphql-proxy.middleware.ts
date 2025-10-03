import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { getInternalGraphqlPort, GraphqlGatewayManager } from './graphql-gateway.manager';

@Injectable()
export class GraphQLProxyMiddleware implements NestMiddleware<FastifyRequest['raw'], FastifyReply['raw']> {
  private readonly proxy: ReturnType<typeof createProxyMiddleware>;

  constructor(
    private readonly config: ConfigService,
    private readonly gatewayManager: GraphqlGatewayManager
  ) {
    this.proxy = createProxyMiddleware({
      target: `http://localhost:${getInternalGraphqlPort(this.config)}`,
      ws: true, // Enable WebSocket proxying for subscriptions
      changeOrigin: true,
    });
  }

  async use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: (error?: unknown) => void) {
    await this.gatewayManager.waitForAvailability();
    await this.proxy(req, res, next);
  }
}
