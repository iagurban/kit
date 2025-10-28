import { Module } from '@nestjs/common';

import { PubSubPublisherService } from './pubsub-publisher.service';
import { PubSubSubscriberService } from './pubsub-subscriber.service';

@Module({
  providers: [PubSubSubscriberService, PubSubPublisherService],
  exports: [PubSubSubscriberService, PubSubPublisherService],
})
export class PubSubModule {}
