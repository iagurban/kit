import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventCreateWithoutChatInput } from './chat-event-create-without-chat.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventCreateOrConnectWithoutChatInput {
  @Field(() => ChatEventWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;

  @Field(() => ChatEventCreateWithoutChatInput, { nullable: false })
  @Type(() => ChatEventCreateWithoutChatInput)
  create!: ChatEventCreateWithoutChatInput;
}
