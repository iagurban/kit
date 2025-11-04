import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { AnyFunction } from '@gurban/kit/utils/types';
import { Injectable, OnModuleDestroy, Provider } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { ConfigService } from '@nestjs/config';
import Redis, { Redis as RedisClient, RedisOptions } from 'ioredis';

import { Logger } from '../../logger/logger.module';

/**
 * Options for configuring the Redis client, extending ioredis's RedisOptions.
 */
export type RedisFabricOptions = RedisOptions;

export const redisOptions = (configService: ConfigService) => ({
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
});

/**
 * Manages the lifecycle of Redis client instances.
 * This factory creates unique, non-shared clients and tracks them to ensure
 * they are gracefully closed on application shutdown.
 *
 * Injectable instances of this class are created via the static `provide` method.
 */
@Injectable()
export class RedisFabric implements OnModuleDestroy {
  private readonly clients = new Set<RedisClient>();

  constructor(
    private readonly options: RedisFabricOptions,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RedisFabric.name);
  }

  /**
   * Creates a new, unique Redis client instance using the provided configuration.
   * Each call to this method returns a new connection.
   * @returns A new RedisClient instance.
   */
  public create(): RedisClient {
    const client = new Redis(this.options);
    this.clients.add(client);
    return client;
  }

  /**
   * Disconnects a specific Redis client and stops tracking it.
   * This should be called by the consumer when it is being destroyed.
   * @param client The RedisClient instance to disconnect.
   */
  public async kill(client: RedisClient): Promise<void> {
    if (this.clients.has(client)) {
      await client.quit();
      this.clients.delete(client);
      this.logger.trace(`Gracefully disconnected a client.`);
    }
  }

  /**
   * NestJS lifecycle hook. Ensures all tracked clients are disconnected
   * when the application shuts down.
   */
  async onModuleDestroy() {
    this.logger.info(`[RedisFabric] Shutting down. Disconnecting ${this.clients.size} clients...`);
    await Promise.all(Array.from(this.clients).map(client => this.kill(client)));
  }

  /**
   * Creates a custom NestJS provider for a RedisFabric instance.
   * @param token A unique token to identify this fabric provider.
   * @param options The factory options for creating the RedisFabric instance.
   * @returns A NestJS Provider.
   */
  public static provide(
    token: InjectionToken,
    options: {
      imports?: unknown[];
      useFactory: AnyFunction<Promise<RedisFabricOptions> | RedisFabricOptions>;
      inject?: (InjectionToken | OptionalFactoryDependency)[];
    }
  ) {
    return {
      provide: token,
      inject: [Logger, ...(options.inject ?? [])],
      useFactory: (async (loggerBase, ...args) => {
        const fabricOptions = await options.useFactory(...args);
        return new RedisFabric(fabricOptions, loggerBase);
      }) as AnyFunction<Promise<RedisFabric>>,
    } satisfies Provider;
  }
  //

  public static provideDefault(token: InjectionToken = RedisFabric): Provider {
    return RedisFabric.provide(token, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...redisOptions(configService),
        maxRetriesPerRequest: 3,
      }),
    });
  }
}
