import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberCreateInput } from './chat-member-create.input';

@ArgsType()
export class CreateOneChatMemberArgs {
  @Field(() => ChatMemberCreateInput, { nullable: false })
  @Type(() => ChatMemberCreateInput)
  data!: ChatMemberCreateInput;
}
