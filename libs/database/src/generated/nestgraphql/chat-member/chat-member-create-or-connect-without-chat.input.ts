import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberCreateWithoutChatInput } from './chat-member-create-without-chat.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberCreateOrConnectWithoutChatInput {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => ChatMemberCreateWithoutChatInput, { nullable: false })
  @Type(() => ChatMemberCreateWithoutChatInput)
  create!: ChatMemberCreateWithoutChatInput;
}
