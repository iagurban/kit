import { Module } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { eventsMembershipChangedTopic } from '@poslah/chats-service/topics/events-membership-changed-topic';
import { projectionMessageCreatedTopic } from '@poslah/messages-service/topics/projection-message-created.topic';
import { projectionMessagePatchedTopic } from '@poslah/messages-service/topics/projection-message-patched.topic';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { MqConsumerModule } from '@poslah/util/modules/mq-consumer-module/mq-consumer.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { SubscriptionsResolver } from './subscriptions.resolver';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsStreamsController } from './subscriptions.streams-controller';

@Module({
  imports: [
    TokenFetcherModule,
    RedisStaticModule,
    MqConsumerModule.forRoot(
      [
        projectionMessageCreatedTopic.name,
        projectionMessagePatchedTopic.name,
        eventsMembershipChangedTopic.name,
      ],
      RedisStaticModule
    ),
  ],
  providers: [ChatsGRPCClient, SubscriptionsService, SubscriptionsResolver],
  controllers: [SubscriptionsStreamsController],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
