import { Module } from '@nestjs/common';

import { KafkaService } from './kafka.service';

@Module({
  providers: [KafkaService.autoconnectionProvider],
  exports: [KafkaService],
})
export class KafkaModule {}
