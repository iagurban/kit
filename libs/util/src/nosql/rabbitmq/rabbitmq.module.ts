import { Module } from '@nestjs/common';

import { LoggerModule } from '../../logger/logger.module';
import { RabbitMqService } from './rabbitmq.service';

@Module({
  imports: [LoggerModule],
  providers: [RabbitMqService],
})
export class RabbitmqModule {}
