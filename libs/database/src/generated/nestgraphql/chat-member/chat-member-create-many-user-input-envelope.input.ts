import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberCreateManyUserInput } from './chat-member-create-many-user.input';

@InputType()
export class ChatMemberCreateManyUserInputEnvelope {
  @Field(() => [ChatMemberCreateManyUserInput], { nullable: false })
  @Type(() => ChatMemberCreateManyUserInput)
  data!: Array<ChatMemberCreateManyUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
