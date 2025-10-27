import { Module } from '@nestjs/common';
import { MessagesGRPCClient } from '@poslah/messages-service/grpc/messages.grpc-client';
import { TokenCheckerModule } from '@poslah/signing-service/token-checker-module/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { RedisStreamConsumerModule } from '@poslah/util/modules/nosql/redis/stream-consumer-module/redis-stream-consumer.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { eventsMembershipChangedTopic } from '../topics/events-membership-changed-topic';
import { eventsRawCreateTopic } from '../topics/events-raw-create-topic';
import { ChatsStreamsController } from './chat.streams-controller';
import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsGRPCController } from './chats.grpc-controller';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { EventsCheckerService } from './events-checker.service';

@Module({
  imports: [
    RedisStaticModule,
    RedisStreamConsumerModule.forRoot(
      [eventsRawCreateTopic.name, eventsMembershipChangedTopic.name],
      RedisStaticModule
    ),
    TokenFetcherModule,
    TokenCheckerModule,
  ],
  controllers: [ChatsGRPCController, ChatsStreamsController],
  providers: [MessagesGRPCClient, ChatPermissionsService, EventsCheckerService, ChatsService, ChatsResolver],
})
export class ChatsModule {}
