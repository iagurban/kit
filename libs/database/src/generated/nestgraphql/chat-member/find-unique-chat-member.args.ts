import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@ArgsType()
export class FindUniqueChatMemberArgs {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;
}
