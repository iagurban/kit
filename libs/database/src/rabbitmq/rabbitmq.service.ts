import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientRMQ } from '@nestjs/microservices';
import { Logger } from '@poslah/util/logger/logger.module';

@Injectable()
export class RabbitMqService extends ClientRMQ implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    private readonly logger2: Logger,
    configService: ConfigService
  ) {
    // Pass the connection options to the parent ClientRMQ constructor
    super({
      urls: [
        `amqp://${configService.get('RABBITMQ_USER')}:${configService.get('RABBITMQ_PASS')}@${configService.get('RABBITMQ_HOST')}:${configService.get('RABBITMQ_PORT')}`,
      ],
      queue: 'messages_events_queue', // The default queue to send to
      queueOptions: {
        durable: true,
      },
    });
  }

  async onApplicationBootstrap() {
    this.logger2.info('Connecting to RabbitMQ...');
    try {
      await this.connect();
      this.logger2.info('✅ Successfully connected to RabbitMQ.');
    } catch (error) {
      this.logger2.error('❌ Failed to connect to RabbitMQ.', error);
      // Depending on your strategy, you might want to exit the process
      // process.exit(1);
    }
  }

  async onApplicationShutdown() {
    await this.close();
    this.logger2.info('RabbitMQ connection closed.');
  }
}
