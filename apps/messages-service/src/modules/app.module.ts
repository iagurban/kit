import { Module } from '@nestjs/common';
import { KafkaModule } from '@poslah/database/kafka/kafka.module';
import { rootImports } from '@poslah/util/root-imports';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaController } from './kafka.controller';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [...rootImports, KafkaModule, MessagesModule],
  controllers: [AppController, KafkaController],
  providers: [AppService],
})
export class AppModule {}
