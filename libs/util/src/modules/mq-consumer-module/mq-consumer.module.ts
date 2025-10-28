import { isROArray } from '@gurban/kit/core/checks';
import { DynamicModule } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { DiscoveryModule } from '@nestjs/core';

import { NestImportable } from '../../nest-types';
import { MqConsumer, MqConsumerProviderOptions } from './mq.consumer';
import { MqDiscoveryService } from './mq-discovery.service';

/**
 * Encapsulates the necessary setup for discovering and registering Redis Stream handlers.
 * Import this module into your root module to enable the @RedisStreamHandler decorator.
 */
export class MqConsumerModule {
  static forRoot(
    streams:
      | readonly string /* stream name */[]
      | Record<
          string /* stream name */,
          MqConsumerProviderOptions | string /* consumers group postfix */ | null
        >,
    redisModule: NestImportable
  ): DynamicModule {
    const providers: Provider[] = [MqDiscoveryService];
    const exports: InjectionToken[] = [];

    for (const [streamName, options] of isROArray(streams)
      ? streams.map(name => [name, null] as const)
      : Object.entries(streams)) {
      const p =
        options == null || typeof options === `string`
          ? MqConsumer.provideDefault(streamName, options)
          : MqConsumer.provide(streamName, options);
      providers.push(p);
      exports.push(p.provide);
    }

    return {
      module: MqConsumerModule,
      imports: [DiscoveryModule, redisModule],
      providers,
      exports,
    };
  }
}
