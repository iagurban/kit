import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable, Provider } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import Redis from 'ioredis';

import { Logger } from '../../logger/logger.module';
import { RedisFabric } from './redis-client.factory';

@Injectable()
export class RedisService extends Redis {
  protected static readonly provideFabric =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <C extends { new (...args: any[]): RedisService }>(token: C) =>
      (fabricKey: InjectionToken | OptionalFactoryDependency = RedisFabric): Provider => ({
        provide: token,
        inject: [fabricKey, Logger],
        useFactory: async (fabric: RedisFabric, parentLogger: Logger) => {
          const logger = createContextualLogger(parentLogger, 'RedisServiceInit');

          const client = fabric.create();

          logger.silent('Connecting to Redis...');
          try {
            // Отправляем команду PING, чтобы убедиться, что соединение установлено
            await client.ping();
            logger.silent('✅ Successfully connected to Redis.');
            return client;
          } catch (error) {
            logger.error({ err: error }, '❌ Failed to connect to Redis.');
            throw error;
          }
        },
      });

  static readonly autoconnectionProvider = RedisService.provideFabric(RedisService);
}

@Injectable()
export class RedisSubscriptionService extends RedisService {
  static override readonly autoconnectionProvider = RedisService.provideFabric(RedisSubscriptionService);
}
