import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@ArgsType()
export class FindUniqueChatEventOrThrowArgs {
  @Field(() => ChatEventWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;
}
