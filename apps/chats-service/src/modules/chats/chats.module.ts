import { Module } from '@nestjs/common';
import { DbModule } from '@poslah/database/db/db.module';
import { RedisStreamConsumer } from '@poslah/database/redis/redis-sream.consumer';
import { messagesGRPCConfig } from '@poslah/messages-service/modules/messages/messages.grpc-config';
import { ClientName } from '@poslah/util/client-name';
import { registerGRPCModule } from '@poslah/util/register-grpc-module';

import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsStreamsController } from './chat-streams.controller';
import { ChatsController } from './chats.controller';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { EventsCheckerService } from './events-checker.service';
import { membershipChangedEventTopic } from './topic/membership-changed-event.topic';
import { messagePatchedEventTopic } from './topic/message-patched-event.topic';

const consumersGroup = 'chats-service';

@Module({
  imports: [DbModule, registerGRPCModule('MESSAGES_SERVICE_CLIENT', messagesGRPCConfig)],
  controllers: [ChatsController, ChatsStreamsController],
  providers: [
    ClientName,
    RedisStreamConsumer.provideDefault(messagePatchedEventTopic.name, consumersGroup),
    RedisStreamConsumer.provideDefault(membershipChangedEventTopic.name, consumersGroup),

    ChatPermissionsService,
    EventsCheckerService,
    ChatsService,

    ChatsResolver,
  ],
})
export class ChatsModule {}
