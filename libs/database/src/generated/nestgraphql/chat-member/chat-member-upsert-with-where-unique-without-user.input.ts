import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatMemberCreateWithoutUserInput } from './chat-member-create-without-user.input';
import { ChatMemberUpdateWithoutUserInput } from './chat-member-update-without-user.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberUpsertWithWhereUniqueWithoutUserInput {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => ChatMemberUpdateWithoutUserInput, { nullable: false })
  @Type(() => ChatMemberUpdateWithoutUserInput)
  update!: ChatMemberUpdateWithoutUserInput;

  @Field(() => ChatMemberCreateWithoutUserInput, { nullable: false })
  @Type(() => ChatMemberCreateWithoutUserInput)
  create!: ChatMemberCreateWithoutUserInput;
}
