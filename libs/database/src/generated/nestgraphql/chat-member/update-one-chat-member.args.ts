import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatMemberUpdateInput } from './chat-member-update.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@ArgsType()
export class UpdateOneChatMemberArgs {
  @Field(() => ChatMemberUpdateInput, { nullable: false })
  @Type(() => ChatMemberUpdateInput)
  data!: ChatMemberUpdateInput;

  @Field(() => ChatMemberWhereUniqueInput, { nullable: false })
  @Type(() => ChatMemberWhereUniqueInput)
  where!: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;
}
