import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Logger } from '@poslah/util/logger/logger.module';

@Injectable()
export class KafkaService extends ClientKafka {
  static readonly autoconnectionProvider: Provider = {
    provide: KafkaService,
    inject: [ConfigService, Logger],

    useFactory: async (configService: ConfigService, parentLogger: Logger) => {
      const logger = parentLogger.logger.child({ context: 'KafkaServiceInit' });

      const client = new KafkaService(configService);

      logger.info('Connecting to Kafka...');
      try {
        // Убеждаемся, что соединение установлено при старте приложения (Fail-Fast)
        await client.connect();
        logger.info('✅ Successfully connected to Kafka.');
        return client;
      } catch (error) {
        logger.error({ err: error }, '❌ Failed to connect to Kafka.');
        // Пробрасываем ошибку дальше, чтобы приложение упало (Fail-Fast)
        throw error;
      }
    },
  };

  constructor(configService: ConfigService) {
    super({
      client: {
        // ID клиента, полезен для логов в Kafka
        clientId: configService.get<string>('KAFKA_CLIENT_ID', 'poslah-producer'),
        // Список брокеров Kafka из .env файла
        brokers: configService.getOrThrow<string>('KAFKA_BROKERS').split(','),
      },
      // Настройки для producer'а
      producer: {
        // Разрешаем автоматическое создание топиков (удобно для разработки)
        allowAutoTopicCreation: configService.get<boolean>('KAFKA_ALLOW_AUTO_TOPIC_CREATION', true),
      },
    });
  }
}
