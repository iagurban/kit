import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateInput } from './chat-create.input';
import { ChatUpdateInput } from './chat-update.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@ArgsType()
export class UpsertOneChatArgs {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateInput, { nullable: false })
  @Type(() => ChatCreateInput)
  create!: ChatCreateInput;

  @Field(() => ChatUpdateInput, { nullable: false })
  @Type(() => ChatUpdateInput)
  update!: ChatUpdateInput;
}
