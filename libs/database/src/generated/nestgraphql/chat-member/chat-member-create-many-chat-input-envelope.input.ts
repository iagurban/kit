import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberCreateManyChatInput } from './chat-member-create-many-chat.input';

@InputType()
export class ChatMemberCreateManyChatInputEnvelope {
  @Field(() => [ChatMemberCreateManyChatInput], { nullable: false })
  @Type(() => ChatMemberCreateManyChatInput)
  data!: Array<ChatMemberCreateManyChatInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
