import { Module } from '@nestjs/common';
import { MessagesGRPCClient } from '@poslah/messages-service/grpc/messages.grpc-client';
import { TokenCheckerModule } from '@poslah/signing-service/token-checker-module/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { RedisStreamConsumerModule } from '@poslah/util/nosql/redis/redis-stream-consumer.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { membershipChangedEventTopic } from '../topics/membership-changed-event.topic';
import { rawCreateEventTopic } from '../topics/raw-create-event.topic';
import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsStreamsController } from './chat-streams.controller';
import { ChatsGRPCController } from './chats.controller';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { EventsCheckerService } from './events-checker.service';

const consumersGroup = 'chats-service';

@Module({
  imports: [
    RedisStaticModule,
    RedisStreamConsumerModule.forRoot(
      {
        [rawCreateEventTopic.name]: consumersGroup,
        [membershipChangedEventTopic.name]: consumersGroup,
      },
      RedisStaticModule
    ),
    TokenFetcherModule,
    TokenCheckerModule,
  ],
  controllers: [ChatsGRPCController, ChatsStreamsController],
  providers: [MessagesGRPCClient, ChatPermissionsService, EventsCheckerService, ChatsService, ChatsResolver],
})
export class ChatsModule {}
