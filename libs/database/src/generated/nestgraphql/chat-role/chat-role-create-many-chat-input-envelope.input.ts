import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleCreateManyChatInput } from './chat-role-create-many-chat.input';

@InputType()
export class ChatRoleCreateManyChatInputEnvelope {
  @Field(() => [ChatRoleCreateManyChatInput], { nullable: false })
  @Type(() => ChatRoleCreateManyChatInput)
  data!: Array<ChatRoleCreateManyChatInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
