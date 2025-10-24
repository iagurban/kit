import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventUpdateInput } from './chat-event-update.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@ArgsType()
export class UpdateOneChatEventArgs {
  @Field(() => ChatEventUpdateInput, { nullable: false })
  @Type(() => ChatEventUpdateInput)
  data!: ChatEventUpdateInput;

  @Field(() => ChatEventWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;
}
