import { compose } from '@apollo/composition';
import { buildSubgraph, Subgraphs } from '@apollo/federation-internals';
import { CachedResource } from '@gurban/kit/cached-resource';
import { ExMap } from '@gurban/kit/collections/ex-map';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@poslah/util/modules/cache/cache.module';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { PubSubSubscriberService } from '@poslah/util/modules/pubsub/pubsub-subscriber.service';
import { parse } from 'graphql';

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
  readonly proxyRoutesResource: CachedResource<ExMap<string, ProxyRoute[]>>;
  readonly supergraphSdlResource: CachedResource<string | null>;

  constructor(
    private readonly cache: CacheService,
    private readonly pubSubSubscriber: PubSubSubscriberService,
    private readonly configService: ConfigService,
    private readonly loggerBase: Logger
  ) {
    this.proxyRoutesResource = new CachedResource(
      'ProxyRoutes',
      this.internalFetchAndBuildProxyRoutes.bind(this),
      this.pubSubSubscriber,
      'gateway:routes_updated',
      this.loggerBase
    );

    this.supergraphSdlResource = new CachedResource(
      'SupergraphSDL',
      this.internalFetchAndComposeSupergraph.bind(this),
      this.pubSubSubscriber,
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

  private async internalFetchAndBuildProxyRoutes(): Promise<ExMap<string, ProxyRoute[]>> {
    const serviceNames = await this.cache.getSetMembers('gateway:proxy-services');
    const allRoutes = new ExMap<string, ProxyRoute[]>();

    for (const serviceName of serviceNames) {
      const routesJson = await this.cache.getAllHashFieldsValues(`gateway:proxy-routes:${serviceName}`);
      if (!routesJson) {
        continue;
      }

      const serviceHost = `${this.configService.getOrThrow(`${serviceName.toUpperCase()}_SERVICE_HOST`)}:${this.configService.getOrThrow(`${serviceName.toUpperCase()}_SERVICE_PORT`)}`;
      if (!serviceHost) {
        this.logger.warn(`No host configured for service '${serviceName}'. Skipping its routes.`);
        continue;
      }

      for (const [path, targetsJson] of Object.entries(routesJson)) {
        const targets = JSON.parse(targetsJson);
        for (const [method, targetPath] of Object.entries(targets)) {
          const internalTarget = `${serviceHost}${targetPath}`;
          allRoutes.getOrCreate(method, () => []).push({ path, target: internalTarget });
        }
      }
    }

    allRoutes.forEach(v => v.sort((a, b) => b.path.length - a.path.length));
    this.logger.debug('Successfully fetched and built proxy routes.');
    return allRoutes;
  }

  private isEmptySchema(sdl: string) {
    return sdl
      .split('\n')
      .map(line => line.trim())
      .every(line => !line || line.startsWith('#'));
  }

  private async internalFetchAndComposeSupergraph(): Promise<string | null> {
    const subgraphEntries = await this.cache.getAllHashFieldsValues('gateway:graphql_subgraphs');

    if (Object.keys(subgraphEntries).length === 0) {
      this.logger.warn('No subgraph schemas found in Redis. Supergraph not built.');
      return null;
    }
    const subgraphs = new Subgraphs();
    for (const entry of Object.values(subgraphEntries)) {
      try {
        const { name, sdl } = JSON.parse(entry);
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
