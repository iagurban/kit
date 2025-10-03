import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import Redis from 'ioredis';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providerFabric = <C extends { new (...args: any[]): RedisService }>(token: C): Provider => ({
  provide: token,
  inject: [ConfigService, Logger],
  useFactory: async (configService: ConfigService, parentLogger: Logger) => {
    const logger = createContextualLogger(parentLogger, 'RedisServiceInit');

    const client = new RedisService(configService);

    logger.info('Connecting to Redis...');
    try {
      // Отправляем команду PING, чтобы убедиться, что соединение установлено
      await client.ping();
      logger.info('✅ Successfully connected to Redis.');
      return client;
    } catch (error) {
      logger.error({ err: error }, '❌ Failed to connect to Redis.');
      // Пробрасываем ошибку дальше, чтобы приложение упало (Fail-Fast)
      throw error;
    }
  },
});

@Injectable()
export class RedisService extends Redis {
  static readonly autoconnectionProvider = providerFabric(RedisService);

  constructor(configService: ConfigService) {
    // Вызываем конструктор родительского класса Redis с опциями из .env
    super({
      host: configService.getOrThrow<string>('REDIS_HOST'),
      port: configService.getOrThrow<number>('REDIS_PORT'),
      password: configService.get<string>('REDIS_PASSWORD'),
      // lazyConnect: true говорит клиенту не подключаться сразу в конструкторе,
      // а дождаться первой команды (в нашем случае - ping() из фабрики).
      // Это лучшая практика для фабрик.
      lazyConnect: true,
    });
  }
}

@Injectable()
export class RedisSubscriptionService extends RedisService {
  static override readonly autoconnectionProvider = providerFabric(RedisSubscriptionService);
}
