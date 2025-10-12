import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { GraphqlGatewayManager } from './graphql-gateway.manager';

@Injectable()
export class GraphQLProxyMiddleware implements NestMiddleware<FastifyRequest['raw'], FastifyReply['raw']> {
  private readonly proxy: ReturnType<typeof createProxyMiddleware>;

  constructor(private readonly gatewayManager: GraphqlGatewayManager) {
    this.proxy = createProxyMiddleware({
      target: `http://localhost:${gatewayManager.internalPort}`,
      ws: true, // Enable WebSocket proxying for subscriptions
      changeOrigin: true,
    });
  }

  async use(
    req: FastifyRequest['raw'] & { originalUrl: string },
    res: FastifyReply['raw'],
    next: (error?: unknown) => void
  ) {
    req.url = req.originalUrl;

    await this.gatewayManager.waitForAvailability();

    await new Promise<void>((resolve, reject) => {
      this.proxy(req, res, (err: unknown) => (err ? reject(err) : resolve()));
      res.on('close', resolve);
    });

    if (!res.writableEnded) {
      next();
    }
  }
}
