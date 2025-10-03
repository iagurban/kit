import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { DbModule } from '@poslah/database/db/db.module';
import { KafkaModule } from '@poslah/database/kafka/kafka.module';
import { LoggerModule } from '@poslah/util/logger/logger.module';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesDb } from './messages-db';

@Module({
  imports: [LoggerModule, ClientsModule, KafkaModule, DbModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesDb],
})
export class MessagesModule {}
