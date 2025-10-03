import { compose } from '@apollo/composition';
import { buildSubgraph, Subgraphs } from '@apollo/federation-internals';
import { ExMap } from '@gurban/kit/collections/ex-map';
import { once } from '@gurban/kit/core/once';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService, RedisSubscriptionService } from '@poslah/database/redis/redis.service';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { parse } from 'graphql';
import { Redis } from 'ioredis';

export interface ProxyRoute {
  path: string;
  target: string;
}

type Subscription = (message: string) => void;

class RedisSubscriber {
  constructor(private readonly redis: Redis) {}

  readonly subscriptions = new ExMap<string, Set<Subscription>>();

  private isAnybodySubscribed() {
    for (const set of this.subscriptions.values()) {
      if (set.size > 0) {
        return true;
      }
    }
    return false;
  }

  private readonly onMessage = (channel: string, message: string) => {
    this.subscriptions.get(channel)?.forEach(c => c(message));
  };

  async subscribe(channel: string, callback: () => unknown) {
    const wasAnybodySubscribed = this.isAnybodySubscribed();
    const subscriptionsBefore = this.subscriptions.size;
    this.subscriptions.update(channel, o => (o || new Set()).add(callback));
    if (!wasAnybodySubscribed) {
      this.redis.on(`message`, this.onMessage);
    }
    if (this.subscriptions.size > subscriptionsBefore) {
      await this.redis.subscribe(channel);
    }

    return async () => {
      const set = this.subscriptions.get(channel);
      let needUnsubscribe = false;
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.subscriptions.delete(channel);
          needUnsubscribe = true;
        }
      }
      if (!this.isAnybodySubscribed()) {
        this.redis.off(`message`, this.onMessage);
      }
      if (needUnsubscribe) {
        await this.redis.unsubscribe(channel);
      }
    };
  }
}

export class CachedResource<T> {
  private dataPromise: Promise<T> | null = null;
  private unsub: (() => Promise<void>) | null = null;
  private readonly subscribers = new Set<() => void>();

  constructor(
    private readonly resourceName: string,
    private readonly fetchFn: () => Promise<T>,
    private readonly subscriber: RedisSubscriber,
    private readonly channel: string,
    private readonly logger: Logger
  ) {}

  /**
   * Initializes the resource by fetching the initial data and subscribing to updates.
   * This should be called from the parent service's `onModuleInit`.
   */
  public async initialize(): Promise<void> {
    this.logger.info(`Initializing and warming cache for resource: [${this.resourceName}]`);
    await this.fetch(); // Trigger the initial fetch

    this.unsub = await this.subscriber.subscribe(this.channel, () => {
      this.fetch(true);
      for (const subscriber of this.subscribers) {
        subscriber();
      }
    });
  }

  subscribe(onUpdate: () => void) {
    this.subscribers.add(onUpdate);
    return () => {
      this.subscribers.delete(onUpdate);
    };
  }

  /**
   * Gets the promise for the resource.
   * Creates the fetch promise on the first call and returns the cached promise thereafter.
   */
  public fetch(force = false): Promise<T> {
    if (force || !this.dataPromise) {
      this.logger.info(`Cache miss for [${this.resourceName}]. Initiating fetch.`);
      this.dataPromise = this.fetchFn();
    }
    return this.dataPromise;
  }

  /**
   * Cleans up the subscription.
   * This should be called from the parent service's `onApplicationShutdown`.
   */
  public async destroy(): Promise<void> {
    if (this.unsub) {
      await this.unsub();
      this.logger.info(`Subscription cleaned up for resource: [${this.resourceName}]`);
    }
  }
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

  private async internalFetchAndComposeSupergraph(): Promise<string | null> {
    const subgraphEntries = await this.redis.hgetall('gateway:graphql_subgraphs');

    if (Object.keys(subgraphEntries).length === 0) {
      this.logger.warn('No subgraph schemas found in Redis. Supergraph not built.');
      return null;
    }
    const subgraphs = new Subgraphs();
    for (const entry of Object.values(subgraphEntries)) {
      try {
        const { name, sdl, url } = JSON.parse(entry); // url might be needed for the constructor
        if (name && sdl) {
          subgraphs.add(buildSubgraph(name, url || `http://${name}`, parse(sdl)));
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
