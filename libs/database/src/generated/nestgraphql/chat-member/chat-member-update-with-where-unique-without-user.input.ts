import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberUpdateWithoutUserInput } from './chat-member-update-without-user.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberUpdateWithWhereUniqueWithoutUserInput {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => ChatMemberUpdateWithoutUserInput, { nullable: false })
  @Type(() => ChatMemberUpdateWithoutUserInput)
  data!: ChatMemberUpdateWithoutUserInput;
}
