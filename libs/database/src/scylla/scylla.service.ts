import { ContextualLogger } from '@gurban/util/logger/logger.module';
import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'cassandra-driver';

@Injectable()
export class ScyllaService extends Client {
  static readonly autoconnectionProvider: Provider = {
    provide: ScyllaService,
    inject: [ConfigService, ContextualLogger],
    useFactory: async (configService: ConfigService, parentLogger: ContextualLogger) => {
      const logger = parentLogger.logger.child({ context: 'ScyllaServiceInit' });

      const client = new ScyllaService(configService);

      logger.info('Connecting to ScyllaDB...');
      try {
        await client.connect();
        logger.info('✅ Successfully connected to ScyllaDB.');
        return client;
      } catch (error) {
        logger.error({ err: error }, '❌ Failed to connect to ScyllaDB.');
        // Пробрасываем ошибку дальше, чтобы приложение упало (Fail-Fast)
        throw error;
      }
    },
  };

  constructor(configService: ConfigService) {
    super({
      // Берем настройки из переменных окружения через ConfigService
      contactPoints: configService.getOrThrow<string>('SCYLLA_CONTACT_POINTS').split(','),
      localDataCenter: configService.getOrThrow<string>('SCYLLA_DATACENTER'),
      keyspace: configService.getOrThrow<string>('SCYLLA_KEYSPACE'),
      queryOptions: { prepare: true },
    });
  }
}
