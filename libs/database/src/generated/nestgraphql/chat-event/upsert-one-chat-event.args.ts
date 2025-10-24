import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventCreateInput } from './chat-event-create.input';
import { ChatEventUpdateInput } from './chat-event-update.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@ArgsType()
export class UpsertOneChatEventArgs {
  @Field(() => ChatEventWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;

  @Field(() => ChatEventCreateInput, { nullable: false })
  @Type(() => ChatEventCreateInput)
  create!: ChatEventCreateInput;

  @Field(() => ChatEventUpdateInput, { nullable: false })
  @Type(() => ChatEventUpdateInput)
  update!: ChatEventUpdateInput;
}
