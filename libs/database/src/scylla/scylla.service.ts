import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@poslah/util/logger/logger.module';
import { Client } from 'cassandra-driver';

@Injectable()
export class ScyllaService extends Client {
  static readonly autoconnectionProvider: Provider = {
    provide: ScyllaService,
    inject: [ConfigService, Logger],
    useFactory: async (configService: ConfigService, parentLogger: Logger) => {
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
