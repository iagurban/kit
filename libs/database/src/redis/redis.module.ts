import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';

@Module({
  providers: [RedisService.autoconnectionProvider],
  exports: [RedisService],
})
export class RedisModule {}
