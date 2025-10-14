import { Module } from '@nestjs/common';
import { RedisStreamConsumerModule } from '@poslah/database/redis/redis-stream-consumer.module';
import { MessagesGRPCClient } from '@poslah/messages-service/grpc/messages.grpc-client';
import { TokenCheckerModule } from '@poslah/signing-service/modules/token/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/modules/token/token-fetcher.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { membershipChangedEventTopic } from '../../topics/membership-changed-event.topic';
import { rawCreateEventTopic } from '../../topics/raw-create-event.topic';
import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsStreamsController } from './chat-streams.controller';
import { ChatsController } from './chats.controller';
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
  controllers: [ChatsController, ChatsStreamsController],
  providers: [MessagesGRPCClient, ChatPermissionsService, EventsCheckerService, ChatsService, ChatsResolver],
})
export class ChatsModule {}
