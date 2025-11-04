import { Module } from '@nestjs/common';

import { RedisStaticModule } from '../../ready-modules/redis-static-module';
import { PubSubPublisherService } from './pubsub-publisher.service';
import { PubSubSubscriberService } from './pubsub-subscriber.service';

@Module({
  imports: [RedisStaticModule],
  providers: [PubSubSubscriberService, PubSubPublisherService],
  exports: [PubSubSubscriberService, PubSubPublisherService],
})
export class PubSubModule {}
