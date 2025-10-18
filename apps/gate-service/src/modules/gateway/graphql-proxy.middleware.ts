import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';

import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { GraphqlGatewayManager } from './graphql-gateway.manager';

@Injectable()
export class GraphQLProxyMiddleware
  implements NestMiddleware<FastifyRequest['raw'], FastifyReply['raw']>, OnModuleInit
{
  private readonly proxy: ReturnType<typeof createProxyMiddleware>;

  constructor(
    private readonly gatewayManager: GraphqlGatewayManager,
    private readonly adapterHost: HttpAdapterHost
  ) {
    this.proxy = createProxyMiddleware({
      target: `http://localhost:${gatewayManager.internalPort}`,
      ws: true, // Enable WebSocket proxying for subscriptions
      changeOrigin: true,
      on: {
        start: () => {
          console.log(`on start`);
        },
        open: () => {
          console.log(`on open`);
        },
        error: (err, req, res) => {
          console.error('Proxy error:', err);
        },
        proxyReqWs: (proxyReq, req, socket, options, head) => {
          console.log('Proxying WebSocket request for:', (req as FastifyRequest).url);
        },
      },
    });
  }

  async use(
    req: FastifyRequest['raw'] & { originalUrl: string },
    res: FastifyReply['raw'],
    next: (error?: unknown) => void
  ) {
    if (req.headers.upgrade?.toLowerCase() === 'websocket') {
      return next();
    }

    if (!req.originalUrl.startsWith('/graphql')) {
      return next();
    }

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

  onModuleInit() {
    const server = this.adapterHost.httpAdapter.getHttpServer();
    server.on('upgrade', (req: IncomingMessage, socket: Socket, head: Buffer) => {
      if (req.url?.startsWith('/graphql')) {
        console.log('Caught upgrade request to /graphql, proxying...');
        this.gatewayManager.waitForAvailability().then(() => {
          this.proxy.upgrade(req, socket, head);
        });
      }
    });
  }
}
