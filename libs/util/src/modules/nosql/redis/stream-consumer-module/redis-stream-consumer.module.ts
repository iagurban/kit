import { isROArray } from '@gurban/kit/core/checks';
import { DynamicModule } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { DiscoveryModule } from '@nestjs/core';

import { NestImportable } from '../../../../nest-types';
import { RedisStreamConsumer, RedisStreamConsumerProviderOptions } from './redis-sream.consumer';
import { RedisStreamDiscoveryService } from './redis-stream-discovery.service';

/**
 * Encapsulates the necessary setup for discovering and registering Redis Stream handlers.
 * Import this module into your root module to enable the @RedisStreamHandler decorator.
 */
export class RedisStreamConsumerModule {
  static forRoot(
    streams:
      | readonly string /* stream name */[]
      | Record<
          string /* stream name */,
          RedisStreamConsumerProviderOptions | string /* consumers group postfix */ | null
        >,
    redisModule: NestImportable
  ): DynamicModule {
    const providers: Provider[] = [RedisStreamDiscoveryService];
    const exports: InjectionToken[] = [];

    for (const [streamName, options] of isROArray(streams)
      ? streams.map(name => [name, null] as const)
      : Object.entries(streams)) {
      const p = !options
        ? RedisStreamConsumer.provideDefault(streamName, null)
        : typeof options === `string`
          ? RedisStreamConsumer.provideDefault(streamName, options)
          : RedisStreamConsumer.provide(streamName, options);
      providers.push(p);
      exports.push(p.provide);
    }

    return {
      module: RedisStreamConsumerModule,
      imports: [DiscoveryModule, redisModule],
      providers,
      exports,
    };
  }
}
