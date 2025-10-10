import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { RedisStreamDiscoveryService } from './redis-stream-discovery.service';

/**
 * Encapsulates the necessary setup for discovering and registering Redis Stream handlers.
 * Import this module into your root module to enable the @RedisStreamHandler decorator.
 */
@Module({
  imports: [DiscoveryModule],
  providers: [RedisStreamDiscoveryService],
})
export class RedisStreamConsumerModule {}
