import { Module } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { eventsMembershipChangedTopic } from '@poslah/chats-service/topics/events-membership-changed-topic';
import { projectionMessageCreatedTopic } from '@poslah/messages-service/topics/projection-message-created.topic';
import { projectionMessagePatchedTopic } from '@poslah/messages-service/topics/projection-message-patched.topic';
import { TokenCheckerModule } from '@poslah/signing-service/token-checker-module/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { RedisStreamConsumerModule } from '@poslah/util/modules/nosql/redis/stream-consumer-module/redis-stream-consumer.module';
import { SubscriptionsPublisherService } from '@poslah/util/modules/nosql/redis/subscriptions-publisher.service';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { SubscriptionsResolver } from './subscriptions.resolver';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsStreamsController } from './subscriptions.streams-controller';

@Module({
  imports: [
    TokenFetcherModule,
    TokenCheckerModule,
    RedisStaticModule,
    RedisStreamConsumerModule.forRoot(
      [
        projectionMessageCreatedTopic.name,
        projectionMessagePatchedTopic.name,
        eventsMembershipChangedTopic.name,
      ],
      RedisStaticModule
    ),
  ],
  providers: [ChatsGRPCClient, SubscriptionsService, SubscriptionsResolver, SubscriptionsPublisherService],
  controllers: [SubscriptionsStreamsController],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
