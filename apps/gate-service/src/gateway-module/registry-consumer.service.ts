import { compose } from '@apollo/composition';
import { buildSubgraph, Subgraphs } from '@apollo/federation-internals';
import { once } from '@gurban/kit/core/once';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { RedisService, RedisSubscriptionService } from '@poslah/util/nosql/redis/redis.service';
import { RedisSubscriber } from '@poslah/util/redis-subscriber';
import { parse } from 'graphql';

import { CachedResource } from '../util/cached-resource';

export interface ProxyRoute {
  path: string;
  target: string;
}

export interface ProxyRoute {
  path: string;
  target: string;
}

@Injectable()
export class RegistryConsumerService implements OnModuleInit, OnApplicationShutdown {
  readonly proxyRoutesResource: CachedResource<ProxyRoute[]>;
  readonly supergraphSdlResource: CachedResource<string | null>;

  private readonly subscriber: RedisSubscriber;

  constructor(
    private readonly redis: RedisService,
    private readonly subRedis: RedisSubscriptionService,
    private readonly configService: ConfigService,
    private readonly loggerBase: Logger
  ) {
    this.subscriber = new RedisSubscriber(this.subRedis);

    this.proxyRoutesResource = new CachedResource(
      'ProxyRoutes',
      this.internalFetchAndBuildProxyRoutes.bind(this),
      this.subscriber,
      'gateway:routes_updated',
      this.loggerBase
    );

    this.supergraphSdlResource = new CachedResource(
      'SupergraphSDL',
      this.internalFetchAndComposeSupergraph.bind(this),
      this.subscriber,
      'gateway:graphql_updated',
      this.loggerBase
    );
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RegistryConsumerService.name);
  }

  /**
   * On startup, initialize all managed resources.
   */
  async onModuleInit() {
    await Promise.all([this.proxyRoutesResource.initialize(), this.supergraphSdlResource.initialize()]);
  }

  /**
   * On shutdown, gracefully destroy all managed resources.
   */
  async onApplicationShutdown() {
    await Promise.all([this.proxyRoutesResource.destroy(), this.supergraphSdlResource.destroy()]);
  }

  // --- The public API is a clean pass-through to the helper instances ---
  public fetchProxyRoutes(): Promise<ProxyRoute[]> {
    return this.proxyRoutesResource.fetch();
  }

  public fetchSupergraphSdl(): Promise<string | null> {
    return this.supergraphSdlResource.fetch();
  }

  private async internalFetchAndBuildProxyRoutes(): Promise<ProxyRoute[]> {
    const routesByService = await this.redis.hgetall('gateway:proxy_routes');
    const allRoutes: ProxyRoute[] = [];

    for (const [serviceName, routesJson] of Object.entries(routesByService)) {
      const serviceHost = this.configService.get(`SERVICE_HOST_${serviceName.toUpperCase()}`);
      if (!serviceHost) {
        this.logger.warn(`No host configured for service '${serviceName}'. Skipping its routes.`);
        continue;
      }

      const serviceRoutes = JSON.parse(routesJson);
      for (const [path, targets] of Object.entries(serviceRoutes)) {
        for (const targetInfo of targets as { target: string; version?: string }[]) {
          const publicPath = targetInfo.version
            ? `/api/${targetInfo.version}/${serviceName}${path}`
            : `/api/${serviceName}${path}`;

          const internalTarget = `${serviceHost}${targetInfo.target}`;
          allRoutes.push({ path: publicPath, target: internalTarget });
        }
      }
    }

    allRoutes.sort((a, b) => b.path.length - a.path.length);
    this.logger.info('Successfully fetched and built proxy routes.');
    return allRoutes;
  }

  private isEmptySchema(sdl: string) {
    return sdl
      .split('\n')
      .map(line => line.trim())
      .every(line => !line || line.startsWith('#'));
  }

  private async internalFetchAndComposeSupergraph(): Promise<string | null> {
    const subgraphEntries = await this.redis.hgetall('gateway:graphql_subgraphs');

    if (Object.keys(subgraphEntries).length === 0) {
      this.logger.warn('No subgraph schemas found in Redis. Supergraph not built.');
      return null;
    }
    const subgraphs = new Subgraphs();
    for (const entry of Object.values(subgraphEntries)) {
      try {
        const { name, sdl } = JSON.parse(entry); // url might be needed for the constructor
        if (name && !this.isEmptySchema(sdl)) {
          const upper = name.toUpperCase();
          // noinspection HttpUrlsUsage
          subgraphs.add(
            buildSubgraph(
              name,
              `http://${this.configService.getOrThrow<string>(`${upper}_SERVICE_HOST`)}:${this.configService.getOrThrow<string>(`${upper}_SERVICE_PORT`)}/graphql`,
              parse(sdl)
            )
          );
        }
      } catch (error) {
        this.logger.error({ error }, 'Failed to parse or add subgraph entry from Redis');
      }
    }

    if (subgraphs.size() === 0) {
      this.logger.warn('All subgraph schemas from Redis were invalid. Supergraph not built.');
      return null;
    }

    const compositionResult = compose(subgraphs);

    if (compositionResult.supergraphSdl) {
      this.logger.info('Successfully fetched and composed supergraph SDL.');
      return compositionResult.supergraphSdl;
    } else {
      this.logger.error({ errors: compositionResult.errors }, 'Supergraph composition failed:');
      return null;
    }
  }
}
