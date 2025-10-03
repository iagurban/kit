import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@poslah/database/rabbitmq/rabbitmq.module';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [RabbitmqModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
