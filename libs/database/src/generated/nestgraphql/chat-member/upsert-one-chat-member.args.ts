import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberCreateInput } from './chat-member-create.input';
import { ChatMemberUpdateInput } from './chat-member-update.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@ArgsType()
export class UpsertOneChatMemberArgs {
  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => ChatMemberCreateInput, { nullable: false })
  @Type(() => ChatMemberCreateInput)
  create!: ChatMemberCreateInput;

  @Field(() => ChatMemberUpdateInput, { nullable: false })
  @Type(() => ChatMemberUpdateInput)
  update!: ChatMemberUpdateInput;
}
