import { Module } from '@nestjs/common';

import { RedisService, RedisSubscriptionService } from './redis.service';

@Module({
  providers: [RedisService.autoconnectionProvider, RedisSubscriptionService.autoconnectionProvider],
  exports: [RedisService],
})
export class RedisModule {}
