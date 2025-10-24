import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatMemberUpdateWithoutChatInput } from './chat-member-update-without-chat.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberUpdateWithWhereUniqueWithoutChatInput {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => ChatMemberUpdateWithoutChatInput, { nullable: false })
  @Type(() => ChatMemberUpdateWithoutChatInput)
  data!: ChatMemberUpdateWithoutChatInput;
}
