import { Module } from '@nestjs/common';

import { ChatEventNNService } from './chat-event-nn.service';
import { DbService } from './db.service';

@Module({
  providers: [DbService, ChatEventNNService],
  exports: [DbService, ChatEventNNService],
})
export class DbModule {}
