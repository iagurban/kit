import { ServerResponse } from 'node:http';

import { ExMap } from '@gurban/kit/collections/ex-map';
import { once } from '@gurban/kit/core/once';
import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { createMatchTree, MatchTreeFn, pathSplitFn } from '@poslah/util/match-tree';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options, RequestHandler } from 'http-proxy-middleware';

import { ProxyRoute, RegistryConsumerService } from '../../registry-consumer.service';

@Injectable()
export class RoutesProxyMiddleware implements NestMiddleware, OnModuleInit {
  constructor(
    private readonly registry: RegistryConsumerService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RoutesProxyMiddleware.name);
  }

  async onModuleInit() {
    this.logger.info('Initializing ProxyMiddleware and subscribing to route updates...');
    this.registry.proxyRoutesResource.subscribe(() => {
      this.registry.proxyRoutesResource.fetch(true); // updates promise synchronously
      this.getMatcher(); // start the process for updating routes (internally waits fetch()'s promise)
    });
    // prefetch the routes
    await this.getMatcher();
  }

  private calculated: Readonly<{
    // The current list of routes, used for matching.
    routes: readonly ProxyRoute[];
    // The cache for proxy handlers. Key: route.path, Value: the proxy function.
    proxies: Map<string, RequestHandler>;
    // The match function for the routes (returns longest prefix match)
    matchPath: MatchTreeFn<ProxyRoute, string>;
  }> = { routes: [], proxies: new Map(), matchPath: createMatchTree([], () => ``, pathSplitFn) };

  // Chaining promise to avoid race conditions and to wait for completion of routes updating if it's in progress.
  private buildingRoutesPromise: Promise<MatchTreeFn<ProxyRoute, string> | undefined> | null = null;

  /**
   * Reuses existing handlers for unchanged routes.
   * Creates new handlers for new or modified routes.
   * Old routes not in the new list are automatically discarded.
   */
  private async getMatcher() {
    return (this.buildingRoutesPromise = (this.buildingRoutesPromise || Promise.resolve())
      .then(async () => {
        const routes = await this.registry.proxyRoutesResource.fetch(); // joins to fetching-promise if it's in progress, else returns actual value
        if (routes === this.calculated.routes) {
          // Cache returned, results are the same
          return this.calculated.matchPath;
        }

        this.logger.info('Intelligently updating proxy routes...');

        const proxies = new Map<string, RequestHandler>(); // build new cache
        const oldRoutesByPath = ExMap.mappedBy(this.calculated.routes, r => r.path);

        for (const newRoute of routes) {
          const oldRoute = oldRoutesByPath.get(newRoute.path);
          const existingProxy = this.calculated.proxies.get(newRoute.path);

          if (oldRoute && oldRoute.target === newRoute.target && existingProxy) {
            // Reuse an existing proxy handler.
            proxies.set(newRoute.path, existingProxy);
          } else {
            this.logger.info(`Creating new proxy handler for path: ${newRoute.path}`);
            proxies.set(newRoute.path, createProxyMiddleware(this.createProxyOptions(newRoute)));
          }
        }

        // Atomically swap to the new, updated routes, cache and match function.
        this.calculated = {
          routes,
          proxies,
          matchPath: createMatchTree(routes, r => r.path, pathSplitFn),
        };
        this.logger.info(`Proxy cache updated. Active handlers: ${this.calculated.proxies.size}`);
        return this.calculated.matchPath;
      })
      .catch((error: unknown) => {
        this.logger.error({ error }, `Error while updateProxies()`);
        return this.calculated.matchPath;
      }));
  }

  /**
   * The actual middleware function that runs on every request.
   * This logic remains unchanged and is very fast.
   */
  async use(req: Request, res: Response, next: NextFunction) {
    // Wait for the matcher to be ready.
    const match = (await this.getMatcher())(req.originalUrl);
    // Any match will do - full or partial: currently we just need to know which is longest.
    // But it's easy to restrict partial ones, e.g., by configuration provided with module (need to be implemented)
    // or by preference from services (need to put on Redis in fullOnly-field, optional like version -
    // {path, target, version, fullOnly}).
    const proxy = match && this.calculated.proxies.get(match.value.path);
    return proxy ? proxy(req, res, next) : next();
  }

  /**
   * A helper to create the proxy options. (Unchanged)
   */
  private createProxyOptions(route: ProxyRoute): Options {
    return {
      target: route.target,
      changeOrigin: true,
      pathRewrite: { [`^${route.path}`]: '' },
      on: {
        error: (error, req, res) => {
          this.logger.error({ error }, `Proxy error for ${req.url}:`);

          if (res instanceof ServerResponse) {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Service Unavailable' }));
          }
        },
      },
    };
  }
}
