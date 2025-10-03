import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventCreateManyChatInput } from './chat-event-create-many-chat.input';

@InputType()
export class ChatEventCreateManyChatInputEnvelope {
  @Field(() => [ChatEventCreateManyChatInput], { nullable: false })
  @Type(() => ChatEventCreateManyChatInput)
  data!: Array<ChatEventCreateManyChatInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
