import { Module } from '@nestjs/common';
import { MessagesGRPCClient } from '@poslah/messages-service/grpc/messages.grpc-client';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { MqConsumerModule } from '@poslah/util/modules/mq-consumer-module/mq-consumer.module';
import { CacheService } from '@poslah/util/modules/nosql/redis/cache.service';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { eventsMembershipChangedTopic } from '../topics/events-membership-changed-topic';
import { eventsRawCreateTopic } from '../topics/events-raw-create-topic';
import { ChatsStreamsController } from './chat.streams-controller';
import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsGRPCController } from './chats.grpc-controller';
import { ChatsRepository } from './chats.repository';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { EventsCheckerService } from './events-checker.service';

@Module({
  imports: [
    RedisStaticModule,
    MqConsumerModule.forRoot(
      [eventsRawCreateTopic.name, eventsMembershipChangedTopic.name],
      RedisStaticModule
    ),
    TokenFetcherModule,
  ],
  controllers: [ChatsGRPCController, ChatsStreamsController],
  providers: [
    ChatsRepository,
    MessagesGRPCClient,
    CacheService,
    ChatPermissionsService,
    EventsCheckerService,
    ChatsService,
    ChatsResolver,
  ],
})
export class ChatsModule {}
