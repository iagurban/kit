import { Module } from '@nestjs/common';

import { LoggerModule } from '../../logger/logger.module';
import { KafkaService } from './kafka.service';

@Module({
  imports: [LoggerModule],
  providers: [KafkaService.autoconnectionProvider],
  exports: [KafkaService],
})
export class KafkaModule {}
