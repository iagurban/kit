import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatMemberCreateWithoutUserInput } from './chat-member-create-without-user.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberCreateOrConnectWithoutUserInput {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => ChatMemberCreateWithoutUserInput, { nullable: false })
  @Type(() => ChatMemberCreateWithoutUserInput)
  create!: ChatMemberCreateWithoutUserInput;
}
