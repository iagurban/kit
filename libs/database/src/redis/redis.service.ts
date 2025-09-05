import { ContextualLogger } from '@gurban/util/logger/logger.module';
import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  static readonly autoconnectionProvider: Provider = {
    provide: RedisService,
    inject: [ConfigService, ContextualLogger],
    useFactory: async (configService: ConfigService, parentLogger: ContextualLogger) => {
      const logger = parentLogger.logger.child({ context: 'RedisServiceInit' });

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
  };

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
